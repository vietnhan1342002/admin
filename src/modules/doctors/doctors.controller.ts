import { Controller, Get, Param, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { BaseController } from 'src/common/base/base.controller';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ResponseDoctorDto } from './dto/response-doctor.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { DoctorFilterDto } from './dto/filter-doctor.dto';
import { Reflector } from '@nestjs/core';
import { SkipDelete } from 'src/common/decorators/skipDelete.decorator';

@Controller('doctors')
@SkipDelete()
export class DoctorsController extends BaseController<
  CreateDoctorDto,
  UpdateDoctorDto,
  ResponseDoctorDto
> {
  constructor(
    private readonly doctorsService: DoctorsService,
    reflector: Reflector,
  ) {
    super(doctorsService, reflector);
  }

  @Public()
  @Get()
  override findAll(@Query() filterDto: DoctorFilterDto) {
    return super.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  override findById(@Param('id') id: string) {
    return super.findById(id);
  }
}
