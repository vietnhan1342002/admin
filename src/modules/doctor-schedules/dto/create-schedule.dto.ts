import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  Matches,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ScheduleType } from '../enum/schedule-type.enum';
import { Type } from 'class-transformer';
import { CreateScheduleSlotDto } from './create-schedule-slot.dto';

export class CreateScheduleDto {
  /** YYYY-MM-DD */
  @IsDateString()
  date: string;

  /** UI logic */
  @IsEnum(ScheduleType)
  type: ScheduleType;

  /** required when type = CUSTOM */
  @IsOptional()
  @ValidateIf((o: CreateScheduleDto) => o.type === ScheduleType.CUSTOM)
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime?: string;

  @IsOptional()
  @ValidateIf((o: CreateScheduleDto) => o.type === ScheduleType.CUSTOM)
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime?: string;

  /** slots FE selected */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleSlotDto)
  slots: CreateScheduleSlotDto[];
}
