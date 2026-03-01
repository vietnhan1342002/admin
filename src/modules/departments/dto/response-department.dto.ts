import { Type } from 'class-transformer';
import { ResponseSpecialtyDto } from 'src/modules/specialties/dto/response-specialty.dto';

export class ResponseDepartmentGroupDto {
  id: string;
  value: string;
  name: string;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
  groupId: string | null;
  @Type(() => ResponseSpecialtyDto)
  specialties: ResponseSpecialtyDto[];
}

// src/modules/departments/dto/response-department.dto.ts
export class ResponseDepartmentDto {
  id: string;
  value: string;
  name: string;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
  groupId: string | null;
}
