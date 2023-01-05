import Redis, { Cluster } from 'ioredis';

export interface ThrottlerStorageRedis {
  /**
   * The redis instance.
   */
  redis: Redis | Cluster;

  /**
   * Add a record to the storage. The record will automatically be removed from
   * the storage once its TTL has been reached.
   */
  addRecord(key: string, ttl: number): Promise<{ totalHits: number, timeToExpire: number }>;
}

export const ThrottlerStorageRedis = Symbol('ThrottlerStorageRedis');
