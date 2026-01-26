import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { DoctorWorkingDateStatus } from '../enum/doctor-working-date.enum';

export class CreateDoctorWorkingDateDto {
  @IsUUID()
  doctorId: string;

  @IsDateString()
  date: string; // yyyy-mm-dd

  @IsOptional()
  @IsEnum(DoctorWorkingDateStatus)
  status?: DoctorWorkingDateStatus;
}
