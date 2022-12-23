## [0.2.2](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.2.1...v0.2.2) (2022-12-23)



## [0.2.1](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.2.0...v0.2.1) (2022-12-22)



# [0.2.0](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.18...v0.2.0) (2022-12-22)


### Bug Fixes

* add support for redis.options.keyPrefix ([29b009f](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/29b009f77cf824d98171de355145350e99d2e113))
* remove @types/ioredis ([fa7d7b4](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/fa7d7b4579c14af9f5e25bddafc348ef32063180))
* simplify code by removing cluster service; fix open handle in tests ([13681b3](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/13681b339c61f6967a35e47d7d4345b7d475efd9))
* upgrade ioredis to v5 and fix usage ([ed48845](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/ed48845d56b4e28da9a2793cf2d704ac56c06759))


### Features

* add redis-clusters to docker and adjust tests ([0f8ad1e](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/0f8ad1e122cc98bb346d14d6be53c20b2b373246))
* implement potentional option for redis clusters support ([#660](https://github.com/kkoomen/nestjs-throttler-storage-redis/issues/660)) ([d22573b](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/d22573bcce0fb080a30fa448e74877e6eefec1ac))



## [0.1.19](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.18...v0.1.19) (2022-05-01)


### Bug Fixes

* add support for redis.options.keyPrefix ([29b009f](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/29b009f77cf824d98171de355145350e99d2e113))
* upgrade ioredis to v5 and fix usage ([ed48845](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/ed48845d56b4e28da9a2793cf2d704ac56c06759))



## [0.1.18](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.17...v0.1.18) (2021-11-19)


### Bug Fixes

* adjust preversion script ([33f07fb](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/33f07fb36032298e136a18d4ade7490dcd4fb6e3))



## [0.1.17](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.16...v0.1.17) (2021-11-19)


### Bug Fixes

* added keyPrefix redis scan ([b5acbfb](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/b5acbfbbdf8a777f2c3ce87f2ad83c8b49fc7093))



## [0.1.16](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.15...v0.1.16) (2021-11-10)


### Bug Fixes

* disconnect redis to avoid open handles ([52470fa](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/52470fac523c6ad84f3de79e4dac4905f41b8009))



## [0.1.15](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.14...v0.1.15) (2021-08-23)



## [0.1.14](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.13...v0.1.14) (2021-08-23)


### Bug Fixes

* remove protected keywords ([6ce0e81](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/6ce0e8140e1eb7c0a6524a23207055e5696fc9d4))
* upgrade all packages ([b428796](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/b42879660c0bc2dd8eb8a3cd6f382afc59489926))


### Features

* allow to change COUNT value in redis scan method ([#392](https://github.com/kkoomen/nestjs-throttler-storage-redis/issues/392)) ([426ec22](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/426ec22272b6bfe722638342cbacb3313698a5ce))



## [0.1.13](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.12...v0.1.13) (2021-03-26)

## [0.1.12](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.11...v0.1.12) (2021-03-26)

### Bug Fixes

- add COUNT value to scan method, fixes [#322](https://github.com/kkoomen/nestjs-throttler-storage-redis/issues/322) ([ed4dc9a](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/ed4dc9a39b9a51779272f53b8518c4fd167794d6))

## [0.1.11](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.10...v0.1.11) (2021-03-09)

### Features

- allow to pass a string url to redis ([39cd987](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/39cd987f3dd15c89baab57c2077557eec8d03f4a))

## [0.1.10](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.8...v0.1.10) (2021-03-08)

### Bug Fixes

- adjust package.json peerDeps ([f49aa8f](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/f49aa8f95b6c1159ec9507e490518022268f8429))
- use correct redis storage service ([e59c4ad](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/e59c4ade0bca2d3ff7d1f805460ce9e15eab6780))
- use redis utility and close connection properly to prevent tests being stuck ([4d6456e](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/4d6456ebd765137b1044f9b2e6a09d5231312daa))
- **workflow:** do the checkout first before other cmds ([4e26c0d](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/4e26c0dddaf324a173506e00a969d0a8146ba95a))

### Features

- implement docker-compose and adjust tests workflow to use docker ([427e811](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/427e811905be55f9e46f4502d2e037f4702aa57a))

## [0.1.10](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.8...v0.1.10) (2021-03-08)

### Bug Fixes

- adjust package.json peerDeps ([f49aa8f](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/f49aa8f95b6c1159ec9507e490518022268f8429))
- use correct redis storage service ([e59c4ad](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/e59c4ade0bca2d3ff7d1f805460ce9e15eab6780))
- use redis utility and close connection properly to prevent tests being stuck ([4d6456e](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/4d6456ebd765137b1044f9b2e6a09d5231312daa))
- **workflow:** do the checkout first before other cmds ([4e26c0d](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/4e26c0dddaf324a173506e00a969d0a8146ba95a))

### Features

- implement docker-compose and adjust tests workflow to use docker ([427e811](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/427e811905be55f9e46f4502d2e037f4702aa57a))

## [0.1.9](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.7...v0.1.9) (2021-03-05)

### Bug Fixes

- use correct redis storage service ([e59c4ad](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/e59c4ade0bca2d3ff7d1f805460ce9e15eab6780))
- use redis utility and close connection properly to prevent tests being stuck ([4d6456e](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/4d6456ebd765137b1044f9b2e6a09d5231312daa))
- **workflow:** do the checkout first before other cmds ([4e26c0d](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/4e26c0dddaf324a173506e00a969d0a8146ba95a))

### Features

- implement docker-compose and adjust tests workflow to use docker ([427e811](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/427e811905be55f9e46f4502d2e037f4702aa57a))
- replace nestjs-throttler with @nestjs/throttler package ([4184f61](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/4184f61d3c15c922e60312befbb2ead8c6270f64))

## [0.1.8](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.6...v0.1.8) (2021-03-05)

### Features

- replace nestjs-throttler with @nestjs/throttler package ([4184f61](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/4184f61d3c15c922e60312befbb2ead8c6270f64))

## [0.1.7](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.5...v0.1.7) (2021-02-22)

### Bug Fixes

- adjust addRecord to set the expiry time correctly ([5498181](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/5498181a3818007803495fbd7b3921123732e0d4))

## [0.1.6](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.5...v0.1.6) (2020-06-10)

### Bug Fixes

- adjust addRecord to set the expiry time correctly ([5498181](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/5498181a3818007803495fbd7b3921123732e0d4))

## [0.1.5](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.4...v0.1.5) (2020-06-08)

## [0.1.4](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.3...v0.1.4) (2020-06-07)

## [0.1.3](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.2...v0.1.3) (2020-06-07)

### Features

- export ThrottlerStorageRedis interface ([7ed0db2](https://github.com/kkoomen/nestjs-throttler-storage-redis/commit/7ed0db21c18d687600c142f92d3799e74b1a8bbf))

## [0.1.2](https://github.com/kkoomen/nestjs-throttler-storage-redis/compare/v0.1.1...v0.1.2) (2020-06-07)

## [0.1.1](https://github.com/kkoomen/nestjs-storage-redis/compare/v0.1.0...v0.1.1) (2020-06-07)

# 0.1.0 (2020-06-07)

### Features

- Initial commit with working prototype ([0a554d6](https://github.com/kkoomen/nestjs-storage-redis/commit/0a554d628799895802fd79b1b17dc5d2e88fb19c))
- prepare initial 0.1 version && add tests ([6c9e047](https://github.com/kkoomen/nestjs-storage-redis/commit/6c9e047aacc0d83d1445477df14515d5091409a9))
