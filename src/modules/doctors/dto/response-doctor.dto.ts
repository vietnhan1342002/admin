// src/modules/doctors/dto/doctor-response.dto.ts
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';

export class ResponseDoctorDto {
  id: string;
  fullName: string;
  avatar?: string;
  specialty: DoctorSpecialty;
  description?: string;
  experience?: number;
  degrees?: string;
  contactEmail?: string;
  contactPhone?: string;
  status: DoctorStatus;
}
