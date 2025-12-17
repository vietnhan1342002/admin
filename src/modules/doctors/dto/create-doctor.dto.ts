// src/modules/doctors/dto/create-doctor.dto.ts
import { IsEnum, IsInt, IsOptional, IsString, IsEmail } from 'class-validator';
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';

export class CreateDoctorDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEnum(DoctorSpecialty)
  specialty: DoctorSpecialty;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  experience?: number;

  @IsOptional()
  @IsString()
  degrees?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsEnum(DoctorStatus)
  status?: DoctorStatus;
}
