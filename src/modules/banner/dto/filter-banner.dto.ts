import { IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';

export class BannerFilterDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  title?: string;
}
