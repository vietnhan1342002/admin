import {
  IsArray,
  IsUUID,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateDoctorShiftDto } from './create-doctor-shift.dto';
import { Type } from 'class-transformer';

import { Matches } from 'class-validator';

export class DoctorSlotTimeDto {
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  start: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  end: string;
}

export class DoctorSelectedSlotsDto {
  @IsUUID()
  doctorId: string;

  @ValidateNested()
  @Type(() => CreateDoctorShiftDto)
  shift: CreateDoctorShiftDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DoctorSlotTimeDto)
  @ArrayNotEmpty()
  selectedSlots: DoctorSlotTimeDto[];
}
