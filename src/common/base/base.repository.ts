/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IBaseRepository } from 'src/interfaces/IBaseRepository';
import {
  DeepPartial,
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  IsNull,
  ObjectLiteral,
  Repository,
} from 'typeorm';
type SortKeys<T> = keyof T;

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string; // field để sắp xếp
  order?: 'ASC' | 'DESC';
  filter?: Record<string, any>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class BaseRepository<
  T extends ObjectLiteral,
> implements IBaseRepository<T> {
  constructor(
    protected readonly repo: Repository<T>,
    protected readonly entity: EntityTarget<T>,
    protected readonly manager?: EntityManager,
  ) {}

  protected getRepo(manager?: EntityManager): Repository<T> {
    return manager ? manager.getRepository(this.entity) : this.repo;
  }

  async findAll(
    params?: PaginationParams,
    options?: FindOneOptions<T>,
  ): Promise<PaginatedResult<T>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const sortBy: SortKeys<T> =
      (params?.sortBy as SortKeys<T>) || ('createdAt' as SortKeys<T>);

    const order = params?.order ?? 'DESC';

    const where: FindOptionsWhere<T> = {
      ...(params?.filter ?? {}),
      deletedAt: IsNull() as any,
    };

    const [data, total] = await this.repo.findAndCount({
      where,
      order: { [sortBy]: order } as any,
      skip: (page - 1) * limit,
      take: limit,

      relations: options?.relations,
      select: options?.select,
      withDeleted: options?.withDeleted,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string, options?: FindOneOptions<T>): Promise<T | null> {
    return await this.repo.findOne({ where: { id } as any, ...options });
  }

  async findOne(
    filter: FindOptionsWhere<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | null> {
    return await this.repo.findOne({ where: filter, ...options });
  }

  create(data: DeepPartial<T>, manager?: EntityManager): Promise<T> {
    const repository = this.getRepo(manager);
    const entity = repository.create(data);
    return repository.save(entity);
  }

  async update(
    id: string,
    data: DeepPartial<T>,
    manager?: EntityManager,
  ): Promise<T | null> {
    const repository = this.getRepo(manager);
    const entity = await repository.findOne({ where: { id } as any });
    if (!entity) return null;

    Object.assign(entity, data);
    return repository.save(entity);
  }

  async delete(id: string, manager?: EntityManager): Promise<boolean> {
    const repository = this.getRepo(manager);
    const result = await repository.delete(id);
    return !!result.affected;
  }

  async softDelete(id: string, manager?: EntityManager): Promise<void> {
    const repository = this.getRepo(manager);
    await repository.softDelete(id);
  }

  async restore(id: string, manager?: EntityManager): Promise<void> {
    const repository = this.getRepo(manager);
    await repository.restore(id);
  }

  async withTransaction<R>(
    fn: (manager: EntityManager) => Promise<R>,
  ): Promise<R> {
    return await this.repo.manager.transaction(fn);
  }
}
