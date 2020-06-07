import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis {
  redis: Redis.Redis;

  constructor(options?: Redis.RedisOptions) {
    this.redis = new Redis(options);
  }

  async getRecord(key: string): Promise<number[]> {
    const ttls = (await this.redis.scan(0, 'MATCH', `${key}:*`)).pop();
    return (ttls as string[]).map(k => parseInt(k.split(':').pop())).sort();
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    const ttlTime = Date.now() + ttl * 1000;
    this.redis.set(`${key}:${ttlTime}`, ttlTime, 'EX', ttlTime);
  }
}
