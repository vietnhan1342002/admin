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
  icon?: string;

  @IsNotEmpty({ message: 'groupId không được để trống' })
  @IsUUID('4', { message: 'groupId phải là UUID hợp lệ' })
  groupId: string;
}
