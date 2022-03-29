"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottlerStorageRedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let ThrottlerStorageRedisService = class ThrottlerStorageRedisService {
    constructor(redisOrOptions, scanCount) {
        this.scanCount = typeof scanCount === 'undefined' ? 1000 : scanCount;
        if (redisOrOptions instanceof ioredis_1.default) {
            this.redis = redisOrOptions;
        }
        else if (typeof redisOrOptions === 'string') {
            this.redis = new ioredis_1.default(redisOrOptions);
            this.disconnectRequired = true;
        }
        else {
            this.redis = new ioredis_1.default(redisOrOptions);
            this.disconnectRequired = true;
        }
    }
    async getRecord(key) {
        var _a;
        const ttls = (await this.redis.scan(0, 'MATCH', `${(_a = this.redis.options) === null || _a === void 0 ? void 0 : _a.keyPrefix}${key}:*`, 'COUNT', this.scanCount)).pop();
        return ttls.map((k) => parseInt(k.split(':').pop())).sort();
    }
    async addRecord(key, ttl) {
        await this.redis.set(`${key}:${Date.now() + ttl * 1000}`, ttl, 'EX', ttl);
    }
    onModuleDestroy() {
        var _a;
        if (this.disconnectRequired) {
            (_a = this.redis) === null || _a === void 0 ? void 0 : _a.disconnect(false);
        }
    }
};
ThrottlerStorageRedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Number])
], ThrottlerStorageRedisService);
exports.ThrottlerStorageRedisService = ThrottlerStorageRedisService;
//# sourceMappingURL=throttler-storage-redis.service.js.map