import { Get, Post, Delete, Body, Param, Query, Patch } from '@nestjs/common';
import { PaginationParams } from './base.repository';
import { IBaseService } from 'src/interfaces/IBaseService';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';

export class BaseController<CreateDTO, UpdateDTO, ResponseDTO> {
  constructor(
    protected readonly service: IBaseService<CreateDTO, UpdateDTO, ResponseDTO>,
  ) {}

  @Get()
  async findAll(@Query() filterDto: BaseFilterDto) {
    const { page, limit, sortBy, order, ...filters } = filterDto;
    const params: PaginationParams = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sortBy,
      order,
      filter: filters,
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
