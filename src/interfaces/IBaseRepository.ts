import {
  PaginatedResult,
  PaginationParams,
} from 'src/common/base/base.repository';
import { DeepPartial } from 'typeorm';

export interface IBaseRepository<T> {
  findAll(params?: PaginationParams): Promise<PaginatedResult<T>>;
  findById(id: string): Promise<T | null>;
  create(data: DeepPartial<T>): Promise<T>;
  update(id: string, data: DeepPartial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
