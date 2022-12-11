import Redis, { Cluster } from 'ioredis';

export interface ThrottlerStorageRedis {
  /**
   * The redis instance.
   */
  redis: Redis | Cluster;

  /**
   * The amount of items that redis should return for each scan.
   * @see https://redis.io/commands/scan#the-count-option
   */
  scanCount: number;

  /**
   * Get a record via its key and return all its request ttls.
   */
  getRecord(key: string): Promise<number[]>;

  /**
   * Add a record to the storage. The record will automatically be removed from
   * the storage once its TTL has been reached.
   */
  addRecord(key: string, value: string, ttl: number): Promise<void>;
}

export const ThrottlerStorageRedis = Symbol('ThrottlerStorageRedis');
