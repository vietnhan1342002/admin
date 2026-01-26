import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { DoctorShiftType } from '../enum/doctor-shift.enum';

export class CreateDoctorShiftDto {
  @IsEnum(DoctorShiftType)
  shiftType: DoctorShiftType;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime: string;

  @IsInt()
  @Min(5, {
    message: 'Thời lượng mỗi slot phải ≥ 5 phút',
  })
  slotDurationMinutes: number;

  @IsOptional()
  @IsString()
  colorName?: string;
}
