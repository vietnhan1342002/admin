import { Controller, Get, Query } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { BaseController } from 'src/common/base/base.controller';
import { StaffResponseDto } from './dto/response-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffFilterDto } from './dto/filter-staff.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from '../users/enum/user-role.enum';
import { Reflector } from '@nestjs/core';
import { SkipDelete } from 'src/common/decorators/skipDelete.decorator';

@Controller('staffs')
@SkipDelete()
@Roles(UserRole.ADMIN)
export class StaffsController extends BaseController<
  CreateStaffDto,
  UpdateStaffDto,
  StaffResponseDto
> {
  constructor(
    private readonly staffsService: StaffsService,
    reflector: Reflector,
  ) {
    super(staffsService, reflector);
  }

  @Get()
  override findAll(@Query() filterDto: StaffFilterDto) {
    return super.findAll(filterDto);
  }
}
