// src/modules/specialties/specialties.controller.ts
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { SpecialtiesService } from './specialties.service';
import { ResponseSpecialtyDto } from './dto/response-specialty.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { SpecialtyFilterDto } from './dto/filter-specialty.dto';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Public()
@Controller('specialties')
export class SpecialtiesController extends BaseController<
  CreateSpecialtyDto,
  UpdateSpecialtyDto,
  ResponseSpecialtyDto
> {
  constructor(
    private readonly specialtyService: SpecialtiesService,
    reflector: Reflector,
  ) {
    super(specialtyService, reflector);
  }
  @Post()
  override create(@Body() body: CreateSpecialtyDto) {
    return super.create(body);
  }

  @Public()
  @Get()
  override findAll(@Query() filterDto: SpecialtyFilterDto) {
    return super.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  override findById(@Param('id') id: string) {
    return super.findById(id);
  }
}
