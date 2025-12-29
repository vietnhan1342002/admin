import {
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Patch,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PaginationParams } from './base.repository';
import { IBaseService } from 'src/interfaces/IBaseService';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';
import { ResponseAPI } from 'src/shared/Helper/ResposeApi.helper';
import { HttpMessages } from 'src/shared/Enum/messages';
import { SKIP_DELETE } from '../decorators/skipDelete.decorator';
import { Reflector } from '@nestjs/core';

export class BaseController<CreateDTO, UpdateDTO, ResponseDTO> {
  constructor(
    protected readonly service: IBaseService<CreateDTO, UpdateDTO, ResponseDTO>,
    protected readonly reflector?: Reflector,
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
    return ResponseAPI.success(
      await this.service.findAll(params),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return ResponseAPI.success(
      await this.service.findById(id),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Post()
  async create(@Body() body: CreateDTO) {
    return ResponseAPI.success(
      await this.service.create(body),
      HttpMessages.SUCCESS,
      HttpStatus.CREATED,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDTO) {
    return ResponseAPI.success(
      await this.service.update(id, body),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const skip = this.reflector?.getAllAndOverride<boolean>(SKIP_DELETE, [
      this.constructor,
    ]);

    if (skip) {
      throw new NotFoundException('Không có đường dẫn này!');
    }
    return ResponseAPI.success(
      await this.service.delete(id),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }
}
