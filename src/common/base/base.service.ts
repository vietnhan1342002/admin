/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  EntityManager,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
} from 'typeorm';
import {
  BaseRepository,
  PaginatedResult,
  PaginationParams,
} from './base.repository';
import { IBaseMapper } from 'src/interfaces/IMapper';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';

export abstract class BaseService<
  T extends ObjectLiteral,
  CreateDTO extends DeepPartial<T>,
  UpdateDTO extends DeepPartial<T>,
  ResponseDTO,
> {
  constructor(
    protected readonly repository: BaseRepository<T>,
    protected readonly mapper: IBaseMapper<T, ResponseDTO>,
    protected readonly resource: Resource,
  ) {}

  // hook cho module con
  protected async beforeCreate(
    _data: CreateDTO,
    _manager?: EntityManager,
  ): Promise<void> {}
  protected async afterCreate(
    _entity: T,
    _data: CreateDTO,
    _manager?: EntityManager,
  ): Promise<void> {}
  protected async beforeUpdate(
    _id: string,
    _data: UpdateDTO,
    _manager?: EntityManager,
  ): Promise<void> {}
  protected async afterUpdate(
    _entity: T,
    _data: UpdateDTO,
    _manager?: EntityManager,
  ): Promise<void> {}
  protected async beforeDelete(
    _id: string,
    _manager?: EntityManager,
  ): Promise<void> {}

  /* ================= QUERY ================= */
  async findAll(
    pagination?: PaginationParams,
    options?: FindOneOptions<T>,
  ): Promise<PaginatedResult<ResponseDTO>> {
    const result = await this.repository.findAll(pagination, options);

    return {
      ...result,
      data: this.mapper.toListResponse(result.data),
    };
  }

  async findById(
    id: string,
    options?: FindOneOptions<T>,
  ): Promise<ResponseDTO> {
    const entity = await this.repository.findById(id, options);
    if (!entity) {
      throw new NotFoundException(
        buildCrudMessage(this.resource, CrudAction.NOT_FOUND),
      );
    }
    return this.mapper.toResponse(entity);
  }

  async findOne(
    filter: FindOptionsWhere<T>,
    options?: FindOneOptions<T>,
  ): Promise<ResponseDTO> {
    const entity = await this.repository.findOne(filter, options);
    if (!entity) {
      throw new NotFoundException(
        buildCrudMessage(this.resource, CrudAction.NOT_FOUND),
      );
    }
    return this.mapper.toResponse(entity);
  }

  /* ================= CREATE ================= */
  async create(data: CreateDTO): Promise<ResponseDTO> {
    await this.beforeCreate(data);
    const entity = await this.repository.create(data);
    await this.afterCreate(entity, data);
    return this.mapper.toResponse(entity);
  }

  async createWithTransaction(data: CreateDTO): Promise<ResponseDTO> {
    return this.repository.withTransaction(async (manager) => {
      await this.beforeCreate(data, manager);

      const entity = await this.repository.create(data, manager);

      await this.afterCreate(entity, data, manager);

      return this.mapper.toResponse(entity);
    });
  }

  /* ================= UPDATE ================= */
  async update(id: string, data: UpdateDTO): Promise<ResponseDTO | null> {
    await this.beforeUpdate(id, data);
    const entity = await this.repository.update(id, data);
    if (!entity) {
      throw new NotFoundException(
        buildCrudMessage(this.resource, CrudAction.NOT_FOUND),
      );
    }
    return this.mapper.toResponse(entity);
  }

  async updateWithTransaction(
    id: string,
    data: UpdateDTO,
  ): Promise<ResponseDTO> {
    return this.repository.withTransaction(async (manager) => {
      await this.beforeUpdate(id, data, manager);

      const entity = await this.repository.update(id, data, manager);
      if (!entity) {
        throw new NotFoundException(
          buildCrudMessage(this.resource, CrudAction.NOT_FOUND),
        );
      }

      await this.afterUpdate(entity, data, manager);

      return this.mapper.toResponse(entity);
    });
  }

  /* ================= DELETE ================= */

  async delete(id: string): Promise<void> {
    await this.beforeDelete(id);
    await this.repository.softDelete(id);
  }

  async deleteWithTransaction(id: string): Promise<void> {
    await this.repository.withTransaction(async (manager) => {
      await this.beforeDelete(id, manager);
      await this.repository.softDelete(id, manager);
    });
  }

  async restore(id: string): Promise<void> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new NotFoundException();
  }
}
