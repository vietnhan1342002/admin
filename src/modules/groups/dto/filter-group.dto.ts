import { IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';

export class GroupFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
