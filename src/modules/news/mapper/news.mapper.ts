import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/common/base/base.mapper';
import { News } from '../entities/news.entity';
import { ResponseNewsDto } from '../dto/response-news.dto';

@Injectable()
export class NewsMapper extends BaseMapper<News, ResponseNewsDto> {
  toResponse(entity: News): ResponseNewsDto {
    return {
      id: entity.id,
      author: entity.author
        ? {
            id: entity.authorId,
            name: entity.author.name,
          }
        : null,
      title: entity.title,
      shortDesc: entity.shortDesc,
      content: entity.content,
      category: entity.categoryId
        ? {
            id: entity.categoryId,
            name: entity.category.name || null,
          }
        : null,
      tags: entity.tags || [],
      metaTitle: entity.metaTitle || null,
      metaDesc: entity.metaDesc || null,
      status: entity.status,
      thumbnail: entity.thumbnail || null,
      view: entity.view,
      slug: entity.slug,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
