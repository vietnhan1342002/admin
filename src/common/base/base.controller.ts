import { Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { BaseService } from './base.service';
import { ObjectLiteral } from 'typeorm';
import { PaginationParams } from './base.repository';

export class BaseController<T extends ObjectLiteral> {
  constructor(protected readonly service: BaseService<T>) {}

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
  async create(@Body() body: any) {
    return this.service.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
