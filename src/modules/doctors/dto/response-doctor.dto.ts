// src/modules/doctors/dto/doctor-response.dto.ts
import { DoctorSpecialty } from '../enum/doctor.enum';

export class ResponseDoctorDto {
  id: string;

  slug: string;
  externalId: string | null;

  name: string;
  title: string | null;

  specialty: DoctorSpecialty;

  department: string | null;
  facility: string | null;

  experienceYears: number;

  languages: string[];
  tags: string[];

  featured: boolean;

  avatar: string | null;

  createdAt: Date;
  updatedAt: Date;
}
