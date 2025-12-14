/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import { BaseRepository, PaginationParams } from './base.repository';

export abstract class BaseService<
  T extends ObjectLiteral,
  CreateDTO extends DeepPartial<T>,
  UpdateDTO extends DeepPartial<T>,
> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  // hook cho module con
  protected async beforeCreate(_data: CreateDTO): Promise<void> {}
  protected async beforeUpdate(_id: string, _data: UpdateDTO): Promise<void> {}
  protected async beforeDelete(_id: string): Promise<void> {}

  findAll(pagination?: PaginationParams) {
    return this.repository.findAll(pagination);
  }

  async findById(id: string): Promise<T> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Item not found');
    return entity;
  }

  async create(data: CreateDTO): Promise<T> {
    await this.beforeCreate(data);
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateDTO): Promise<T | null> {
    await this.beforeUpdate(id, data);
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.beforeDelete(id);
    await this.repository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}
