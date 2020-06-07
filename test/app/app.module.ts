import { Module } from '@nestjs/common';
import { ThrottlerModule } from 'nestjs-throttler';
import { ThrottlerStorageRedisService } from '../../src';
import { AppService } from './app.service';
import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 5,
      ttl: 60,
      storage: new ThrottlerStorageRedisService(),
    }),
    ControllerModule,
  ],
  providers: [AppService],
})
export class AppModule {}
