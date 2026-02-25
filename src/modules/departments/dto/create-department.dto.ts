// src/modules/departments/dto/create-department.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
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

  @IsOptional()
  @IsUUID('4', { message: 'groupId phải là UUID hợp lệ' })
  groupId?: string;
}
