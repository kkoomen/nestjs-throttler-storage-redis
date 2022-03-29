import Redis from 'ioredis';
export interface ThrottlerStorageRedis {
    redis: Redis;
    scanCount: number;
    getRecord(key: string): Promise<number[]>;
    addRecord(key: string, ttl: number): Promise<void>;
}
export declare const ThrottlerStorageRedis: unique symbol;
