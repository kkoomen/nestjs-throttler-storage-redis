import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';
export declare type Type<T extends ThrottlerStorageRedis> = {
    new (...args: any[]): T;
};
