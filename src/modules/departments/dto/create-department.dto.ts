// src/modules/departments/dto/create-department.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateDepartmentDto {
  @IsNotEmpty({ message: 'Tên phòng ban không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  block?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
