import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';

export class CreateDoctorDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsEnum(DoctorSpecialty)
  @IsNotEmpty()
  specialty: DoctorSpecialty;

  @IsNotEmpty()
  @IsString()
  department?: string;

  @IsNotEmpty()
  @IsInt()
  experience?: number;

  @IsNotEmpty()
  @IsString()
  degrees?: string;

  @IsOptional()
  @IsEnum(DoctorStatus)
  status?: DoctorStatus;

  @IsDateString()
  dateAdded: string;
}
