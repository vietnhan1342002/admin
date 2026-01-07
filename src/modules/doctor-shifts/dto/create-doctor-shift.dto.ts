import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ShiftStatus, ShiftType } from '../enum/shift.enum';
export class CreateDoctorShiftDto {
  @IsUUID()
  doctorId: string;

  @IsEnum(ShiftType)
  shiftType: ShiftType;

  @IsDateString()
  shiftDate: string;

  @IsOptional()
  startTime?: string;

  @IsOptional()
  endTime?: string;

  @IsInt()
  slotDurationMinutes: number;

  @IsOptional()
  @IsEnum(ShiftStatus)
  status?: ShiftStatus;
}
