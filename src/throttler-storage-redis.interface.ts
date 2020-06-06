import * as Redis from 'ioredis';

export interface ThrottlerStorageRedis {
  /**
   * The redis instance.
   */
  storage: Redis.Redis;

  /**
   * Get a record via its key and return all its request ttls.
   */
  getRecord(key: string): Promise<number[]>;

  /**
   * Add a record to the storage. The record will automatically be removed from
   * the storage once its TTL has been reached.
   */
  addRecord(key: string, ttl: number): Promise<void>;
}

export const ThrottlerStorageRedis = Symbol('ThrottlerStorageRedis');
