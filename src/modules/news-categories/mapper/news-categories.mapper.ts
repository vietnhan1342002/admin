import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/common/base/base.mapper';
import { ResponseNewsCategoryDto } from '../dto/response-news-category.dto';
import { NewsCategory } from '../entities/news-category.entity';

@Injectable()
export class NewsCategoryMapper extends BaseMapper<
  NewsCategory,
  ResponseNewsCategoryDto
> {
  toResponse(entity: NewsCategory): ResponseNewsCategoryDto {
    const dto = new ResponseNewsCategoryDto();

    dto.id = entity.id;
    dto.name = entity.name;
    dto.icon = entity.icon;
    dto.color = entity.color;
    dto.totalNews = entity.totalNews;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;

    return dto;
  }
}
