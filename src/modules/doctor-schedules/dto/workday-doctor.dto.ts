import { IsArray, ValidateNested, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { DoctorSelectedSlotsDto } from './doctor-selected-slots.dto';

export class WorkdayDoctorsDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DoctorSelectedSlotsDto)
  doctors: DoctorSelectedSlotsDto[];
}
