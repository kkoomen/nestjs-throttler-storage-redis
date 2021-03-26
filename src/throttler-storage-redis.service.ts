import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis {
  redis: Redis.Redis;

  constructor(redis?: Redis.Redis);
  constructor(options?: Redis.RedisOptions);
  constructor(url?: string);
  constructor(redisOrOptions?: Redis.Redis | Redis.RedisOptions | string) {
    if (redisOrOptions instanceof Redis) {
      this.redis = redisOrOptions;
    } else if (typeof redisOrOptions === 'string') {
      this.redis = new Redis(redisOrOptions as string);
    } else {
      this.redis = new Redis(redisOrOptions);
    }
  }

  async getRecord(key: string): Promise<number[]> {
    const ttls = (await this.redis.scan(0, 'MATCH', `${key}:*`, 'COUNT', 10000)).pop();
    return (ttls as string[]).map((k) => parseInt(k.split(':').pop())).sort();
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    await this.redis.set(`${key}:${Date.now() + ttl * 1000}`, ttl, 'EX', ttl);
  }
}
