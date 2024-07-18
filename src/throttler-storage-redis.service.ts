import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';
import Redis, { Cluster, RedisOptions } from 'ioredis';
import { ThrottlerStorageRedis } from './throttler-storage-redis.interface';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorageRedis, OnModuleDestroy {
  scriptSrc: string;
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
      this.disconnectRequired = true;
    } else {
      this.redis = new Redis(redisOrOptions as RedisOptions);
      this.disconnectRequired = true;
    }

    this.scriptSrc = this.getScriptSrc();
  }

  getScriptSrc(): string {
    // Credits to wyattjoh for the fast implementation you see below.
    // https://github.com/wyattjoh/rate-limit-redis/blob/main/src/lib.ts
    return `
      local hitKey = KEYS[1]
      local blockKey = KEYS[2]
      local throttlerName = ARGV[1]
      local ttl = tonumber(ARGV[2])
      local limit = tonumber(ARGV[3])
      local blockDuration = tonumber(ARGV[4])

      local totalHits = redis.call('INCR', hitKey)
      local timeToExpire = redis.call('PTTL', hitKey)
      
      if timeToExpire <= 0 then
        redis.call('PEXPIRE', hitKey, ttl)
        timeToExpire = ttl
      end

      local isBlocked = redis.call('GET', blockKey)
      local timeToBlockExpire = 0

      if isBlocked then
        timeToBlockExpire = redis.call('PTTL', blockKey)
      elseif totalHits > limit then
        redis.call('SET', blockKey, 1, 'PX', blockDuration)
        isBlocked = '1'
        timeToBlockExpire = blockDuration
      end

      if isBlocked and timeToBlockExpire <= 0 then
        redis.call('DEL', blockKey)
        redis.call('SET', hitKey, 1, 'PX', ttl)
        totalHits = 1
        timeToExpire = ttl
        isBlocked = false
      end

      return { totalHits, timeToExpire, isBlocked and 1 or 0, timeToBlockExpire }
    `
      .replace(/^\s+/gm, '')
      .trim();
  }

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<ThrottlerStorageRecord> {
    const hitKey = `${this.redis.options.keyPrefix}{${key}:${throttlerName}}:hits`;
    const blockKey = `${this.redis.options.keyPrefix}{${key}:${throttlerName}}:blocked`;
    const results: number[] = (await this.redis.call(
      'EVAL',
      this.scriptSrc,
      2,
      hitKey,
      blockKey,
      throttlerName,
      ttl,
      limit,
      blockDuration,
    )) as number[];

    if (!Array.isArray(results)) {
      throw new TypeError(`Expected result to be array of values, got ${results}`);
    }

    const [totalHits, timeToExpire, isBlocked, timeToBlockExpire] = results;

    if (typeof totalHits !== 'number') {
      throw new TypeError('Expected totalHits to be a number');
    }

    if (typeof timeToExpire !== 'number') {
      throw new TypeError('Expected timeToExpire to be a number');
    }

    if (typeof isBlocked !== 'number') {
      throw new TypeError('Expected isBlocked to be a number');
    }

    if (typeof timeToBlockExpire !== 'number') {
      throw new TypeError('Expected timeToBlockExpire to be a number');
    }

    return {
      totalHits,
      timeToExpire: Math.ceil(timeToExpire / 1000),
      isBlocked: isBlocked === 1,
      timeToBlockExpire: Math.ceil(timeToBlockExpire / 1000),
    };
  }

  onModuleDestroy() {
    if (this.disconnectRequired) {
      this.redis?.disconnect(false);
    }
  }
}
