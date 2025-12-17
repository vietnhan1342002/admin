import {
  PaginationParams,
  PaginatedResult,
} from 'src/common/base/base.repository';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IBaseService<CreateDTO, UpdateDTO, ResponseDTO> {
  findAll(params?: PaginationParams): Promise<PaginatedResult<ResponseDTO>>;

  findById(id: string): Promise<ResponseDTO>;

  create(data: CreateDTO): Promise<ResponseDTO>;

  update(id: string, data: UpdateDTO): Promise<ResponseDTO | null>;

  delete(id: string): Promise<void>;

  restore?(id: string): Promise<void>;
}
