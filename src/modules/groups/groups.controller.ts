import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseController } from 'src/common/base/base.controller';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupFilterDto } from './dto/filter-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';
import { ResponseGroupDto } from './dto/response-group.dto';

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
    return this.groupsService.findTree();
  }

  @Get(':id')
  override findById(@Param('id') id: string) {
    return super.findById(id);
  }
}
