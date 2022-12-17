import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis, OnModuleDestroy {
  redis: Redis;
  disconnectRequired?: boolean;

  constructor(redis?: Redis);
  constructor(options?: RedisOptions);
  constructor(url?: string);
  constructor(redisOrOptions?: Redis | RedisOptions | string) {
    if (redisOrOptions instanceof Redis) {
      this.redis = redisOrOptions;
    } else if (typeof redisOrOptions === 'string') {
      this.redis = new Redis(redisOrOptions as string);
      this.disconnectRequired = true;
    } else {
      this.redis = new Redis(redisOrOptions);
      this.disconnectRequired = true;
    }
  }

  /**
   * @description: This method look for members (records) in a Redis set, see: https://redis.io/docs/data-types/sets/
   *
   * @param key
   */
  async getRecord(key: string): Promise<number[]> {
    const setMembers = await this.redis.smembers(key);
    const now = +new Date();

    /*
     That is a Redis SET cleaning mechanism.
     - There is no way to set ttl for each set member separately.
     - Each time new member is added to the set, set expiration is moving forward.
     - We need to clean expired members manually (to avoid extra memory usage).
     - That is needed in cases when set not expires during long period of time (because of continuous addRecord triggers)
    */
    const expiredMembers = setMembers.filter((m) => +m < now);
    if (expiredMembers.length) {
      const multi = this.redis.multi();
      for (const expiredMember of expiredMembers) {
        multi.srem(expiredMember);
      }
      await multi.exec();
    }

    return setMembers
      .filter((m) => +m > now)
      .map((m) => +m)
      .sort();
  }

  /**
   * @description: This method adds a record (member) to the Redis Set, see: https://redis.io/docs/data-types/sets/
   *
   * @param key
   * @param ttl
   */
  async addRecord(key: string, ttl: number): Promise<void> {
    // add expiration timestamp to the set, and move set expiration forward
    const multi = this.redis.multi();
    multi.sadd(key, Date.now() + ttl * 1000);
    multi.expire(key, ttl);
    await multi.exec();
  }

  onModuleDestroy() {
    if (this.disconnectRequired) {
      this.redis?.disconnect(false);
    }
  }
}
