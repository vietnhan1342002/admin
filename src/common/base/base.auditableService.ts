import { DeepPartial, ObjectLiteral } from 'typeorm';
import { BaseService } from './base.service';
import { BaseRepository } from './base.repository';
import { UserContextService } from './user.context';

export abstract class AuditableBaseService<
  T extends ObjectLiteral,
  CreateDTO extends DeepPartial<T>,
  UpdateDTO extends DeepPartial<T>,
> extends BaseService<T, CreateDTO, UpdateDTO> {
  constructor(
    repository: BaseRepository<T>,
    protected readonly userContext: UserContextService,
  ) {
    super(repository);
  }

  async create(data: CreateDTO): Promise<T> {
    await this.beforeCreate(data);
    console.log('Creating by user:', this.userContext.userId);

    return this.repository.create({
      ...data,
      author: this.userContext.userId,
    });
  }

  async update(id: string, data: UpdateDTO): Promise<T | null> {
    await this.beforeUpdate(id, data);
    return this.repository.update(id, {
      ...data,
      author: this.userContext.userId,
    });
  }
}
