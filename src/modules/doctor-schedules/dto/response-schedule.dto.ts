import { ScheduleType } from '../enum/schedule-type.enum';
import { ScheduleStatus } from '../enum/schedule-status.enum';

export class ScheduleResponseDto {
  id: string;

  /** YYYY-MM-DD */
  date: string;

  type: ScheduleType;

  /** resolved time range (preset hoặc custom) */
  startTime: string;
  endTime: string;

  status: ScheduleStatus;

  createdAt: string;
  updatedAt: string;
}
