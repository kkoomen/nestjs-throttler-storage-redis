# NestJS Throttler Redis Storage Package

This package provides the Redis storage for the
[nestjs-throttler](nestjs-throttler) package.

# Usage

```ts
import { ThrottlerModule } from 'nestjs-throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 5,
      ttl: 60,
      storage: new ThrottlerStorageRedisService(),
    }),
  ],
})
export class AppModule {}
```

[nestjs-throttler]: https://github.com/jmcdo29/nestjs-throttler
