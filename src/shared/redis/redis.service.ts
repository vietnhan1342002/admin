import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisTestService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // Test set & get cache
  async setAndGet(key: string, value: any, ttlSeconds = 60) {
    await this.cacheManager.set(key, value, ttlSeconds);
    const cachedValue = await this.cacheManager.get(key);
    return cachedValue;
  }

  // Test delete cache
  async deleteKey(key: string) {
    return await this.cacheManager.del(key);
  }
}
