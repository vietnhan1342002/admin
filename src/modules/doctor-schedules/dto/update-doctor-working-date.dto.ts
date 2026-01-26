import { IsEnum } from 'class-validator';
import { DoctorWorkingDateStatus } from '../enum/doctor-working-date.enum';

export class UpdateDoctorWorkingDateStatusDto {
  @IsEnum(DoctorWorkingDateStatus)
  status: DoctorWorkingDateStatus;
}
