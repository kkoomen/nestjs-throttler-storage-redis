import { Injectable } from '@nestjs/common';
import Redis, { ClusterNode, ClusterOptions } from 'ioredis';
import { ThrottlerStorageRedisService } from './throttler-storage-redis.service';

@Injectable()
export class ThrottlerStorageRedisClusterService extends ThrottlerStorageRedisService {
  constructor(nodes: ClusterNode[], options?: ClusterOptions, scanCount?: number) {
    super(new Redis.Cluster(nodes, options), scanCount);
  }
}
