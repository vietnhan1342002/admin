/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import { BaseRepository, PaginationParams } from './base.repository';
import { IBaseMapper } from 'src/interfaces/IMapper';

export abstract class BaseService<
  T extends ObjectLiteral,
  CreateDTO extends DeepPartial<T>,
  UpdateDTO extends DeepPartial<T>,
  ResponseDTO,
> {
  constructor(
    protected readonly repository: BaseRepository<T>,
    protected readonly mapper: IBaseMapper<T, ResponseDTO>,
  ) {}

  // hook cho module con
  protected async beforeCreate(_data: CreateDTO): Promise<void> {}
  protected async beforeUpdate(_id: string, _data: UpdateDTO): Promise<void> {}
  protected async beforeDelete(_id: string): Promise<void> {}

  async findAll(pagination?: PaginationParams) {
    const result = await this.repository.findAll(pagination);

    return {
      ...result,
      data: this.mapper.toListResponse(result.data),
    };
  }

  async findById(id: string): Promise<ResponseDTO> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException('Item not found');
    return this.mapper.toResponse(entity);
  }

  async create(data: CreateDTO): Promise<ResponseDTO> {
    await this.beforeCreate(data);
    const entity = await this.repository.create(data);
    return this.mapper.toResponse(entity);
  }

  async update(id: string, data: UpdateDTO): Promise<ResponseDTO | null> {
    await this.beforeUpdate(id, data);
    const entity = await this.repository.update(id, data);
    if (!entity) throw new NotFoundException('Item not found');
    return this.mapper.toResponse(entity);
  }

  async delete(id: string): Promise<void> {
    await this.beforeDelete(id);
    await this.repository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repository.restore(id);
  }
}
