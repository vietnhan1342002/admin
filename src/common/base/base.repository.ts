/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IBaseRepository } from 'src/interfaces/IBaseRepository';
import {
  DeepPartial,
  EntityManager,
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
    protected readonly manager?: EntityManager,
  ) {}

  async findAll(params?: PaginationParams): Promise<PaginatedResult<T>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const sortBy: SortKeys<T> =
      (params?.sortBy as SortKeys<T>) || ('createdAt' as SortKeys<T>);
    const order = params?.order ?? 'DESC';
    const filter: FindOptionsWhere<T> = params?.filter ?? {};

    const [data, total] = await this.repo.findAndCount({
      ...filter,
      deletedAt: IsNull(),
      order: { [sortBy]: order } as any,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<T | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async findOne(filter: FindOptionsWhere<T>): Promise<T | null> {
    return this.repo.findOne({ where: filter });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T | null> {
    const entity = await this.findById(id);
    if (!entity) return null;

    Object.assign(entity, data);
    return this.repo.save(entity);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected ? true : false;
  }

  async softDelete(id: string): Promise<void> {
    await this.findById(id);
    await this.repo.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.repo.restore(id);
  }

  async withTransaction<R>(
    fn: (manager: EntityManager) => Promise<R>,
  ): Promise<R> {
    if (!this.manager) {
      throw new Error('EntityManager is not provided');
    }

    return this.manager.transaction(fn);
  }
}
