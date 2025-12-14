import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PostCategory, PostStatus } from '../enum/post.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  summary?: string;

  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @IsEnum(PostCategory)
  @IsOptional()
  category?: PostCategory;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  /**
   * Không cho client tự set:
   * - views
   * - published_at
   * - author
   * -> xử lý trong service
   */
}
