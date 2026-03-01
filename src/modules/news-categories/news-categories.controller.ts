import { Controller, Get, Param, Query } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { FilterNewsCategoryDto } from './dto/filter-news-category.dto';
import { ResponseNewsCategoryDto } from './dto/response-news-category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news-category.dto';
import { NewsCategoriesService } from './news-categories.service';

@Controller('news-categories')
@Public()
export class NewsCategoriesController extends BaseController<
  CreateNewsCategoryDto,
  UpdateNewsCategoryDto,
  ResponseNewsCategoryDto
> {
  constructor(private readonly newsCategoriesService: NewsCategoriesService) {
    super(newsCategoriesService);
  }

  @Public()
  @Get()
  override findAll(@Query() filterDto: FilterNewsCategoryDto) {
    return super.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  override findById(@Param('id') id: string) {
    return super.findById(id);
  }
}
