import { ThrottlerStorage } from '@nestjs/throttler';
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
  increment: ThrottlerStorage['increment'];
}

export const ThrottlerStorageRedis = Symbol('ThrottlerStorageRedis');
