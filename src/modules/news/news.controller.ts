import { Body, Controller, Get, Query } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseController } from 'src/common/base/base.controller';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsFilterDto } from './dto/filter-news.dto';
import { ResponseNewsDto } from './dto/response-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController extends BaseController<
  CreateNewsDto,
  UpdateNewsDto,
  ResponseNewsDto
> {
  constructor(
    private readonly newsService: NewsService,
    reflector: Reflector,
  ) {
    super(newsService, reflector);
  }

  @Get()
  override findAll(@Query() filterDto: NewsFilterDto) {
    return super.findAll(filterDto);
  }
}
