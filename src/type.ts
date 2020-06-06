import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

export type Type<T extends ThrottlerStorageRedis> = { new (...args: any[]): T };
