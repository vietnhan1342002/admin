import { Injectable } from '@nestjs/common';
import type { RedisClientType } from 'redis';

export interface CacheOptions {
  ttl?: number; // second
}

@Injectable()
export class BaseCache<T> {
  constructor(protected readonly redisClient: RedisClientType) {}

  private getKey(key: string) {
    return `cache:${key}`;
  }

  async set(key: string, value: T, options?: CacheOptions) {
    const ttl = options?.ttl ?? 3600; // default 1h
    await this.redisClient.set(this.getKey(key), JSON.stringify(value), {
      EX: ttl,
    });
  }

  async get(key: string): Promise<T | null> {
    const data = await this.redisClient.get(this.getKey(key));
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  async del(key: string) {
    await this.redisClient.del(this.getKey(key));
  }

  async clearPrefix(prefix: string) {
    // xóa tất cả keys bắt đầu bằng prefix
    const keys = await this.redisClient.keys(`cache:${prefix}*`);
    if (keys.length) await this.redisClient.del(keys);
  }
}
