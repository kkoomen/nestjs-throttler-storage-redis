import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis, { Cluster, RedisOptions } from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis, OnModuleDestroy {
  redis: Redis | Cluster;
  disconnectRequired?: boolean;

  constructor(redis?: Redis);
  constructor(cluster?: Cluster);
  constructor(options?: RedisOptions);
  constructor(url?: string);
  constructor(redisOrOptions?: Redis | Cluster | RedisOptions | string) {
    if (redisOrOptions instanceof Redis || redisOrOptions instanceof Cluster) {
      this.redis = redisOrOptions;
    } else if (typeof redisOrOptions === 'string') {
      this.redis = new Redis(redisOrOptions as string);
    } else {
      this.redis = new Redis(redisOrOptions as RedisOptions);
    }
  }

  async getRecord(key: string): Promise<number[]> {
    const setMembers = await this.redis.smembers(key);
    const now = Date.now();

    // Clean expired members manually (to avoid extra memory usage)
    const expiredMembers = setMembers.filter((m: string) => parseInt(m) < now);
    if (expiredMembers.length) {
      await this.redis.srem(key, expiredMembers);
    }

    return setMembers
      .filter((m: string) => parseInt(m) > now)
      .map((m: string) => parseInt(m))
      .sort();
  }

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
