import { DoctorSlimResponseDto } from './response-doctor-specialty.dto';

// src/modules/specialties/dto/response-specialty.dto.ts
export class ResponseSpecialtyDto {
  id: string;
  value: string;
  name: string;
  departmentId: string;
  doctors: DoctorSlimResponseDto[];
  createdAt: Date;
  updatedAt: Date;
}
