import { IsUUID, Matches } from 'class-validator';

export class CreateScheduleSlotDto {
  @IsUUID()
  doctorId: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime: string;
}
