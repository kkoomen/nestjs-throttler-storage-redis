# NestJS Throttler Redis Storage

![Tests status](https://img.shields.io/github/workflow/status/kkoomen/nestjs-throttler-storage-redis/Tests/master)

Redis storage provider for the [@nestjs/throttler](https://github.com/nestjs/throttler) package.

# Installation

### Yarn

- `yarn add nestjs-throttler-storage-redis ioredis`

### NPM

- `npm install --save nestjs-throttler-storage-redis ioredis`

# Usage

Basic usage:

```ts
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
      storage: new ThrottlerStorageRedisService(),
    }),
  ],
})
export class AppModule {}
```

Inject another config module and service:

```ts
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
        storage: new ThrottlerStorageRedisService(),
      }),
    }),
  ],
})
export class AppModule {}
```

Using redis clusters:

```ts
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisClusterService } from 'nestjs-throttler-storage-redis';

const nodes = [
  { host: '127.0.0.1', port: 7000 },
  { host: '127.0.0.1', port: 7001 },
  ...
  { host: '127.0.0.1', port: 7005 },
];

const options = {
  redisOptions: {
    password: 'your-redis-password'
  }
};

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
        storage: new ThrottlerStorageRedisClusterService(nodes, options),
      }),
    }),
  ],
})
export class AppModule {}
```

# Issues

Bugs and features related to the redis implementation are welcome in this
repository.

# License

NestJS Throttler Redis Storage is licensed under the MIT license.
