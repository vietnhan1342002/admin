/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  DeepPartial,
  FindOptionsWhere,
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

export class BaseRepository<T extends ObjectLiteral> {
  constructor(protected readonly repo: Repository<T>) {}

  async findAll(params?: PaginationParams): Promise<PaginatedResult<T>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const sortBy: SortKeys<T> =
      (params?.sortBy as SortKeys<T>) || ('createdAt' as SortKeys<T>);
    const order = params?.order ?? 'DESC';
    const filter: FindOptionsWhere<T> = params?.filter ?? {};

    const [data, total] = await this.repo.findAndCount({
      where: filter,
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

  findById(id: string): Promise<T | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  update(id: string, data: Partial<T>): Promise<T> {
    return this.repo.save({ id, ...data } as any);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected ? true : false;
  }
}
