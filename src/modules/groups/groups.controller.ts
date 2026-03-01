import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseController } from 'src/common/base/base.controller';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupFilterDto } from './dto/filter-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';
import { ResponseGroupDto } from './dto/response-group.dto';
import { HttpMessages } from 'src/shared/Enum/messages';
import { ResponseAPI } from 'src/shared/Helper/ResposeApi.helper';

@Public()
@Controller('groups')
export class GroupsController extends BaseController<
  CreateGroupDto,
  UpdateGroupDto,
  ResponseGroupDto
> {
  constructor(
    private readonly groupsService: GroupsService,
    reflector: Reflector,
  ) {
    super(groupsService, reflector);
  }

  @Post()
  override create(@Body() body: CreateGroupDto) {
    return super.create(body);
  }

  @Get()
  override findAll(@Query() filterDto: GroupFilterDto) {
    return super.findAll(filterDto);
  }

  @Get('tree')
  async findTree() {
    return ResponseAPI.success(
      await this.groupsService.findTree(),
      HttpMessages.SUCCESS,
      HttpStatus.ACCEPTED,
    );
  }

  @Get(':id')
  override findById(@Param('id') id: string) {
    return super.findById(id);
  }
}
