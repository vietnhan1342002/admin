// src/modules/doctors/dto/doctor-response.dto.ts
import { StaffResponseDto } from 'src/modules/staffs/dto/response-staff.dto';
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';

export class ResponseDoctorDto {
  id: string;

  specialty: DoctorSpecialty;
  department?: string;
  experience?: number;
  degrees?: string;
  status: DoctorStatus;

  dateAdded: Date;
  createdAt: Date;

  staff: StaffResponseDto | null;
}
