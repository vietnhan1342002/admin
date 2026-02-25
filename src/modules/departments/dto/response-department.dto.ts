import { SpecialtySlimResponseDto } from 'src/modules/specialties/dto/response-doctor-specialty.dto';

export class DepartmentGroupDto {
  id: string;
  value: string;
  name: string;
}

// src/modules/departments/dto/response-department.dto.ts
export class ResponseDepartmentDto {
  id: string;
  value: string;
  name: string;
  block: string | null;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
  groupId: string | null;
  group?: DepartmentGroupDto | null;
  specialties?: SpecialtySlimResponseDto[];
}
