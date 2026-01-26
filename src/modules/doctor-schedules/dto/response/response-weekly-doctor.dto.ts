import { Type } from 'class-transformer';
import { WorkdayDoctorsResponseDto } from './response-workday-doctor.dto';

export class DoctorWeeklySlotsResponseDto {
  @Type(() => WorkdayDoctorsResponseDto)
  workdays: WorkdayDoctorsResponseDto[];
}
