import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';
import { NewsStatus } from '../enum/news-status.enum';

export class NewsFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsEnum(NewsStatus)
  status?: NewsStatus;
}
