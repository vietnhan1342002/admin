import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkdayDoctorsDto } from './workday-doctor.dto';

export class UpsertDoctorWorkingSlotsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkdayDoctorsDto)
  workdays: WorkdayDoctorsDto[];
}
