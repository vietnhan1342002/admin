import { Type } from 'class-transformer';
import { DoctorSlotsResponseDto } from './response-doctor-slot.dto';

export class WorkdayDoctorsResponseDto {
  date: string;

  @Type(() => DoctorSlotsResponseDto)
  doctors: DoctorSlotsResponseDto[];
}
