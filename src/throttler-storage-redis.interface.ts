import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';
import Redis, { Cluster } from 'ioredis';

export interface ThrottlerStorageRedis {
  /**
   * The redis instance.
   */
  redis: Redis | Cluster;

  /**
   * Increment the amount of requests for a given record. The record will
   * automatically be removed from the storage once its TTL has been reached.
   */
  increment(key: string, ttl: number): Promise<ThrottlerStorageRecord>;
}

export const ThrottlerStorageRedis = Symbol('ThrottlerStorageRedis');
