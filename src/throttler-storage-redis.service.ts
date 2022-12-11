import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis, { Cluster, RedisOptions } from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis, OnModuleDestroy {
  redis: Redis | Cluster;
  disconnectRequired?: boolean;
  scanCount: number;

  constructor(redis?: Redis, scanCount?: number);
  constructor(options?: RedisOptions, scanCount?: number);
  constructor(cluster?: Cluster, scanCount?: number);
  constructor(url?: string, scanCount?: number);
  constructor(redisOrOptions?: Redis | RedisOptions | Cluster | string, scanCount?: number) {
    this.scanCount = typeof scanCount === 'undefined' ? 1000 : scanCount;

    if (redisOrOptions instanceof Redis || redisOrOptions instanceof Cluster) {
      this.redis = redisOrOptions;
    } else if (typeof redisOrOptions === 'string') {
      this.redis = new Redis(redisOrOptions as string);
    } else {
      this.redis = new Redis(redisOrOptions as RedisOptions);
    }
  }

  async getRecord(key: string): Promise<number[]> {
    // Use the `scan` method to iterate over the keys of all databases in the cluster
    let cursor = '0';
    let keys: string[] = [];
    do {
      // Get the next set of keys using the cursor
      const [newCursor, newKeys] = await this.redis.scan(cursor, 'MATCH', key, 'COUNT', this.scanCount);
      cursor = newCursor;

      // Add the new keys to the list of keys
      keys = [...keys, ...newKeys];
    } while (cursor !== '0');

    // Get the members of the set stored at each key
    const pipeline = this.redis.pipeline();
    for (const key of keys) {
      pipeline.smembers(key);
    }
    const values = await pipeline.exec();

    // Map the values to an array of numbers representing the request TTLs
    // and sort the array in ascending order
    return values.map((value: [Error, string]) => parseInt(value[1], 10)).sort();
  }

  async addRecord(key: string, value: string, ttl: number): Promise<void> {
    // Use the `keys` command instead of `scan` for Redis Clusters
    if (this.redis instanceof Cluster) {
      const keys = await this.redis.keys(key);

      for (const key of keys) {
        await this.redis.set(key, value, 'EX', ttl);
      }
    } else {
      // Use `scan` for regular Redis instances
      let cursor = '0';
      do {
        const [newCursor, keys] = await this.redis.scan(cursor, 'MATCH', key, 'COUNT', this.scanCount);
        cursor = newCursor;

        const pipeline = this.redis.pipeline();
        for (const key of keys) {
          pipeline.set(key, value, 'EX', ttl);
        }
        await pipeline.exec();
      } while (cursor !== '0');
    }
  }

  onModuleDestroy() {
    if (this.disconnectRequired) {
      this.redis?.disconnect(false);
    }
  }
}
