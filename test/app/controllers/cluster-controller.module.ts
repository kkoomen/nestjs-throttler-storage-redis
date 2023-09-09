import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '../../../src';
import { cluster } from '../../utility/redis-cluster';
import { AppService } from '../app.service';
import { AppController } from './app.controller';
import { DefaultController } from './default.controller';
import { LimitController } from './limit.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ limit: 5, ttl: 60000 }],
      ignoreUserAgents: [/throttler-test/g],
      storage: new ThrottlerStorageRedisService(cluster),
    }),
  ],
  controllers: [AppController, DefaultController, LimitController],
  providers: [AppService],
})
export class ClusterControllerModule {}
