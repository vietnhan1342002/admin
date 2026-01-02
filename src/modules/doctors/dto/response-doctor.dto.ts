// src/modules/doctors/dto/doctor-response.dto.ts
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';
export class ResponseDoctorDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl?: string | null;
  specialty: DoctorSpecialty;
  department?: string;
  experience?: number;
  degrees?: string;
  status: DoctorStatus;

  dateAdded: Date;
  createdAt: Date;
}
