# NestJS Throttler Redis Storage

Redis storage provider for the [nestjs-throttler](nestjs-throttler) package.

# Installation

### Yarn

- `yarn add nestjs-throttler nestjs-throttler-storage-redis ioredis`

### NPM

- `npm install --save nestjs-throttler nestjs-throttler-storage-redis ioredis`

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

# Issues

Bugs and features related to the redis implementation are welcome in this
repository.

For any issues related to the nestjs-throttler, please submit an issue at the
[nestjs-throttler](https://github.com/jmcdo29/nestjs-throttler) repository.

# License

NestJS Throttler Redis Storage is licensed under the MIT license.
