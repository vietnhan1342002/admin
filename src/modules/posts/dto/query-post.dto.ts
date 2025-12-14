import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PostCategory, PostStatus } from '../enum/post.enum';

export class QueryPostDto {
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @IsEnum(PostCategory)
  @IsOptional()
  category?: PostCategory;

  @IsString()
  @IsOptional()
  keyword?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
