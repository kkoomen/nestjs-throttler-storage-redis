import { OnModuleDestroy } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';
export declare class ThrottlerStorageRedisService implements ThrottlerStorageRedis, OnModuleDestroy {
    redis: Redis;
    disconnectRequired?: boolean;
    scanCount: number;
    constructor(redis?: Redis, scanCount?: number);
    constructor(options?: RedisOptions, scanCount?: number);
    constructor(url?: string, scanCount?: number);
    getRecord(key: string): Promise<number[]>;
    addRecord(key: string, ttl: number): Promise<void>;
    onModuleDestroy(): void;
}
