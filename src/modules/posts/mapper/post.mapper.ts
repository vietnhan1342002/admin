import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostResponseDto } from '../dto/response-post.dto';
import { BaseMapper } from 'src/common/base/base.mapper';

@Injectable()
export class PostMapper extends BaseMapper<Post, PostResponseDto> {
  toResponse(entity: Post): PostResponseDto {
    const dto = new PostResponseDto();

    dto.id = entity.id;
    dto.title = entity.title;
    dto.slug = entity.slug;
    dto.summary = entity.summary;
    dto.content = entity.content;
    dto.thumbnail = entity.thumbnail;
    dto.status = entity.status;
    dto.category = entity.category;
    dto.views = entity.views;
    dto.publishedAt = entity.publishedAt;
    dto.author = entity.author;
    return dto;
  }
}
