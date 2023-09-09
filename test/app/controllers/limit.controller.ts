import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from '../app.service';

@Throttle({ default: { limit: 2, ttl: 10000 } })
@Controller('limit')
export class LimitController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getThrottled() {
    return this.appService.success();
  }

  @Throttle({ default: { limit: 5, ttl: 10000 } })
  @Get('higher')
  getHigher() {
    return this.appService.success();
  }

  @Throttle({ default: { limit: 3, ttl: 10000 } })
  @Get('flooded')
  getFlooded() {
    return this.appService.success();
  }
}
