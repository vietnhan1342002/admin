// src/modules/doctors/dto/create-doctor.dto.ts
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';

export class CreateDoctorProfileDto {
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

import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { CreateStaffDto } from 'src/modules/staffs/dto/create-staff.dto';

export class CreateDoctorDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ValidateNested()
  @Type(() => CreateStaffDto)
  staff: CreateStaffDto;

  @ValidateNested()
  @Type(() => CreateDoctorProfileDto)
  doctor: CreateDoctorProfileDto;
}
