import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';
import { StaffStatus } from '../enum/staff.enum';

export class StaffFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StaffStatus)
  status?: StaffStatus;
}
