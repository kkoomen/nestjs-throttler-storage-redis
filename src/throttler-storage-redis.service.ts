import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis {
  storage: Redis.Redis;

  constructor(options?: Redis.RedisOptions) {
    this.storage = new Redis(options);
  }

  async getRecord(key: string): Promise<number[]> {
    const ttls = (await this.storage.scan(0, 'MATCH', `${key}:*`)).pop();
    return (ttls as string[]).map(k => parseInt(k.split(':').pop())).sort();
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    const ttlTime = Date.now() + ttl * 1000;
    this.storage.set(`${key}:${ttlTime}`, ttlTime, 'EX', ttlTime);
  }
}
