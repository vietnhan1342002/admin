// src/modules/departments/dto/filter-department.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { BaseFilterDto } from 'src/shared/utils/filter.dto.util';

export class DepartmentFilterDto extends BaseFilterDto {
  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  block?: string;
}
