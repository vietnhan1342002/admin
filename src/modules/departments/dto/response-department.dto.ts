// src/modules/departments/dto/response-department.dto.ts
export class ResponseDepartmentDto {
  id: string;
  value: string;
  name: string;
  block: string | null;
  icon: string | null;
  createdAt: Date;
  updatedAt: Date;
}
