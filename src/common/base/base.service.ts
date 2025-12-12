import { NotFoundException } from '@nestjs/common';
import {
  BaseRepository,
  PaginatedResult,
  PaginationParams,
} from './base.repository';
import { DeepPartial, ObjectLiteral } from 'typeorm';

export class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  findAll(pagination?: PaginationParams): Promise<PaginatedResult<T>> {
    return this.repository.findAll(pagination);
  }

  async findById(id: string): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Item not found');
    return entity;
  }

  create(data: DeepPartial<T>): Promise<T> {
    return this.repository.create(data);
  }

  update(id: string, data: Partial<T>): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id); // check_exists
    return this.repository.delete(id);
  }
}
