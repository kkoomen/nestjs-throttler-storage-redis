import { Module } from '@nestjs/common';
import { ThrottlerModule } from 'nestjs-throttler';
import { ThrottlerStorageRedisService } from '../../src';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 5,
      ttl: 60,
      storage: new ThrottlerStorageRedisService(),
    }),
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
