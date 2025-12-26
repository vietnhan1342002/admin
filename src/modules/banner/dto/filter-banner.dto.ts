import { IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';
import { BannerStatus } from '../enum/bannerStatus.enum';

export class BannerFilterDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  status?: BannerStatus;
}
