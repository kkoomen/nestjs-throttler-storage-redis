import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis, { Cluster, RedisOptions } from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis, OnModuleDestroy {
  private _scriptSrc: string;
  redis: Redis | Cluster;
  disconnectRequired?: boolean;

  constructor(redis?: Redis);
  constructor(cluster?: Cluster);
  constructor(options?: RedisOptions);
  constructor(url?: string);
  constructor(redisOrOptions?: Redis | Cluster | RedisOptions | string) {
    if (redisOrOptions instanceof Redis || redisOrOptions instanceof Cluster) {
      this.redis = redisOrOptions;
    } else if (typeof redisOrOptions === 'string') {
      this.redis = new Redis(redisOrOptions as string);
    } else {
      this.redis = new Redis(redisOrOptions as RedisOptions);
    }

    this._scriptSrc = this.getScriptSrc();
  }

  private getScriptSrc(): string {
    return `
      local totalHits = redis.call("INCR", KEYS[1])
      local timeToExpire = redis.call("PTTL", KEYS[1])
      if timeToExpire <= 0
        then
          redis.call("PEXPIRE", KEYS[1], tonumber(ARGV[1]))
          timeToExpire = tonumber(ARGV[1])
        end
      return { totalHits, timeToExpire }
    `.replace(/^\s+/gm, "").trim();
  }

  async addRecord(key: string, ttl: number): Promise<{ totalHits: number, timeToExpire: number }> {
    // Use EVAL instead of EVALSHA to support redis instances and clusters.
    const results: number[] = await this.redis.call(
      'EVAL',
      this._scriptSrc,
      1,
      key,
      ttl * 1000,
    ) as number[];
    const [ totalHits, timeToExpire ] = results;
    return { totalHits, timeToExpire };
  }

  onModuleDestroy() {
    if (this.disconnectRequired) {
      this.redis?.disconnect(false);
    }
  }
}
