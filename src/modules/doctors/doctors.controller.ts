import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { BaseController } from 'src/common/base/base.controller';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ResponseDoctorDto } from './dto/response-doctor.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { DoctorFilterDto } from './dto/filter-doctor.dto';
import { Reflector } from '@nestjs/core';
import { ResponseAPI } from 'src/shared/Helper/ResposeApi.helper';
import { HttpMessages } from 'src/shared/Enum/messages';

@Public()
@Controller('doctors')
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
  @Post()
  override async create(@Body() dto: CreateDoctorDto) {
    return ResponseAPI.success(
      await this.doctorsService.createWithTransaction(dto),
      HttpMessages.SUCCESS,
      HttpStatus.CREATED,
    );
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
