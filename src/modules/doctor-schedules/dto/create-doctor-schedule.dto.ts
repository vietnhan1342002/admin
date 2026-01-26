import { IsArray, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { WorkdayDoctorsDto } from './workday-doctor.dto';

export class CreateDoctorScheduleDto {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkdayDoctorsDto)
  data: WorkdayDoctorsDto[];
}
