import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis, OnModuleDestroy {
  redis: Redis.Redis;
  disconnectRequired?: boolean;
  scanCount: number;

  constructor(redis?: Redis.Redis, scanCount?: number);
  constructor(options?: Redis.RedisOptions, scanCount?: number);
  constructor(url?: string, scanCount?: number);
  constructor(redisOrOptions?: Redis.Redis | Redis.RedisOptions | string, scanCount?: number) {
    this.scanCount = typeof scanCount === 'undefined' ? 1000 : scanCount;

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

  async getRecord(key: string): Promise<number[]> {
    const ttls = (
      await this.redis.scan(
        0,
        'MATCH',
        `${this.redis.options?.keyPrefix}${key}:*`,
        'COUNT',
        this.scanCount,
      )
    ).pop();
    return (ttls as string[]).map((k) => parseInt(k.split(':').pop())).sort();
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    await this.redis.set(`${key}:${Date.now() + ttl * 1000}`, ttl, 'EX', ttl);
  }

  onModuleDestroy() {
    if (this.disconnectRequired) {
      this.redis?.disconnect(false);
    }
  }
}
