import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis {
  constructor(private redis: Redis.Redis) {}

  async getRecord(key: string): Promise<number[]> {
    const ttls = (await this.redis.scan(0, 'MATCH', `${key}:*`)).pop();
    return (ttls as string[]).map(k => parseInt(k.split(':').pop())).sort();
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    this.redis.set(`${key}:${Date.now() + ttl * 1000}`, ttl, 'EX', ttl);
  }
  
  static create(options?: Redis.RedisOptions) {
    return new this(new Redis(options));
  }
}
