import { Get, Post, Delete, Body, Param, Query, Patch } from '@nestjs/common';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import { PaginationParams } from './base.repository';
import { IBaseService } from 'src/interfaces/IBaseService';

export class BaseController<
  T extends ObjectLiteral,
  CreateDTO extends DeepPartial<T>,
  UpdateDTO extends DeepPartial<T>,
  ResponseDTO,
> {
  constructor(
    protected readonly service: IBaseService<
      unknown,
      CreateDTO,
      UpdateDTO,
      ResponseDTO
    >,
  ) {}

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'ASC' | 'DESC',
    @Query() filter?: Record<string, any>, // nhận tất cả query còn lại làm filter
  ) {
    const params: PaginationParams = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sortBy,
      order,
      filter,
    };
    return this.service.findAll(params);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() body: CreateDTO) {
    return this.service.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDTO) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
