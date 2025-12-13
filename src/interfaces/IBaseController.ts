import { PaginationParams } from 'src/common/base/base.repository';
import { DeepPartial } from 'typeorm';

export interface IBaseController<T> {
  findAll(params?: PaginationParams): any;
  findById(id: string): any;
  create(data: DeepPartial<T>): any;
  update(id: string, data: DeepPartial<T>): any;
  delete(id: string): any;
}
