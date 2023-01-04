import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ClusterControllerModule } from './controllers/cluster-controller.module';
import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [ControllerModule],
  // imports: [ClusterControllerModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
