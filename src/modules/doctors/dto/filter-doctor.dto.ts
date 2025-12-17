import { IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';

export class DoctorFilterDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  fullName?: string;
}
