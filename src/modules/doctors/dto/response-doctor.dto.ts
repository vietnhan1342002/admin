// src/modules/doctors/dto/doctor-response.dto.ts
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';
import { UserResponseDto } from 'src/modules/users/dto/response-user.dto';

export class ResponseDoctorDto {
  id: string;

  user: UserResponseDto | null;

  specialty: DoctorSpecialty;
  department?: string;
  experience?: number;
  degrees?: string;
  status: DoctorStatus;

  dateAdded: Date;
  createdAt: Date;
}
