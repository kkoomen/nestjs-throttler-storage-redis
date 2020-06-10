import { Module } from '@nestjs/common';
import { ThrottlerModule } from 'nestjs-throttler';
import { AppService } from '../app.service';
import { AppController } from './app.controller';
import { DefaultController } from './default.controller';
import { LimitController } from './limit.controller';
import { ThrottlerStorageRedisService } from '../../../src';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 5,
      ttl: 60,
      ignoreUserAgents: [/throttler-test/g],
      storage: new ThrottlerStorageRedisService(),
    }),
  ],
  controllers: [AppController, DefaultController, LimitController],
  providers: [AppService],
})
export class ControllerModule {}
