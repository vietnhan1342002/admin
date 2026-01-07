import { IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';

export class DoctorFilterDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  shiftType?: string;

  @IsString()
  @IsOptional()
  shiftDate?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
