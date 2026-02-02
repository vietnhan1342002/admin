// src/modules/doctors/dto/doctor-response.dto.ts

import { SpecialtySlimResponseDto } from 'src/modules/specialties/dto/response-doctor-specialty.dto';

export class ResponseDoctorDto {
  id: string;

  slug: string;
  externalId: string | null;

  name: string;
  title: string | null;

  specialties: SpecialtySlimResponseDto[];

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
