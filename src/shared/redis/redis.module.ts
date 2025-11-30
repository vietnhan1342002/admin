// redis.module.ts
import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisTestService } from './redis.service';
import { RedisTestController } from './redis.controller';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get('REDIS_URL'),
        ttl: 60, // default 60s
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisTestService],
  controllers: [RedisTestController],
  exports: [RedisTestService],
})
export class RedisModule {}
