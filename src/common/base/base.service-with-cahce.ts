import { NotFoundException } from '@nestjs/common';
import { BaseCache } from './base.redis';
import { BaseRepository } from './base.repository';
import { DeepPartial, ObjectLiteral } from 'typeorm';

export class BaseServiceWithCache<T extends ObjectLiteral> {
  constructor(
    protected readonly repository: BaseRepository<T>,
    protected readonly cache: BaseCache<T>,
    private readonly cachePrefix: string,
  ) {}

  async findById(id: string): Promise<T> {
    const cacheKey = `${this.cachePrefix}:${id}`;
    let entity = await this.cache.get(cacheKey);
    if (!entity) {
      entity = await this.repository.findById(id);
      if (!entity) throw new NotFoundException('Item not found');
      await this.cache.set(cacheKey, entity);
    }
    return entity;
  }

  async findAll(params?: any): Promise<any> {
    const cacheKey = `${this.cachePrefix}:all:${JSON.stringify(params)}`;

    let data = await this.cache.get(cacheKey);
    if (!data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data = (await this.repository.findAll(params)) as any;
      await this.cache.set(cacheKey, data as any);
    }
    return data;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.create(data);
    await this.cache.clearPrefix(this.cachePrefix);
    return entity;
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.update(id, data);
    await this.cache.del(`${this.cachePrefix}:${id}`);
    await this.cache.clearPrefix(`${this.cachePrefix}:all`);
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    await this.cache.del(`${this.cachePrefix}:${id}`);
    await this.cache.clearPrefix(`${this.cachePrefix}:all`);
    return result;
  }
}
