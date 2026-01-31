// src/modules/specialties/dto/filter-specialty.dto.ts
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';

export class SpecialtyFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  departmentId?: string;
}
