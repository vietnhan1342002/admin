import { DeepPartial, ObjectLiteral } from 'typeorm';
import { BaseService } from './base.service';
import { BaseRepository } from './base.repository';
import { UserContextService } from './user.context';
import { BaseMapper } from './base.mapper';
import { NotFoundException } from '@nestjs/common';

export abstract class AuditableBaseService<
  T extends ObjectLiteral,
  CreateDTO extends DeepPartial<T>,
  UpdateDTO extends DeepPartial<T>,
  ResponseDTO,
> extends BaseService<T, CreateDTO, UpdateDTO, ResponseDTO> {
  constructor(
    repository: BaseRepository<T>,
    protected readonly userContext: UserContextService,
    mapper: BaseMapper<T, ResponseDTO>,
  ) {
    super(repository, mapper);
  }

  async create(data: CreateDTO): Promise<ResponseDTO> {
    await this.beforeCreate(data);
    console.log('Creating by user:', this.userContext.userId);

    const result = await this.repository.create({
      ...data,
      author: this.userContext.userId,
    });
    return this.mapper.toResponse(result);
  }

  async update(id: string, data: UpdateDTO): Promise<ResponseDTO | null> {
    await this.beforeUpdate(id, data);
    const result = await this.repository.update(id, {
      ...data,
      author: this.userContext.userId,
    });
    if (!result) throw new NotFoundException('Item not found');
    return this.mapper.toResponse(result);
  }
}
