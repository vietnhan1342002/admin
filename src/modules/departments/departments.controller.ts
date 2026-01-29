// src/modules/departments/departments.controller.ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { DepartmentsService } from './departments.service';
import { ResponseDepartmentDto } from './dto/response-department.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { DepartmentFilterDto } from './dto/filter-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Public()
@Controller('departments')
export class DepartmentsController extends BaseController<
  CreateDepartmentDto,
  UpdateDepartmentDto,
  ResponseDepartmentDto
> {
  constructor(
    private readonly departmentsService: DepartmentsService,
    reflector: Reflector,
  ) {
    super(departmentsService, reflector);
  }

  @Post()
  override create(@Body() body: CreateDepartmentDto) {
    return super.create(body);
  }

  @Public()
  @Get()
  override findAll(@Query() filterDto: DepartmentFilterDto) {
    return super.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  override findById(@Param('id') id: string) {
    return super.findById(id);
  }
}
