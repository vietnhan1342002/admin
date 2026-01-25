import { ScheduleType } from './schedule-type.enum';

export interface ScheduleTimeRange {
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}
export const PRESET_SCHEDULE_TIME: Record<
  Exclude<ScheduleType, ScheduleType.CUSTOM>,
  ScheduleTimeRange
> = {
  [ScheduleType.MORNING]: {
    startTime: '08:00',
    endTime: '12:00',
  },
  [ScheduleType.AFTERNOON]: {
    startTime: '13:00',
    endTime: '17:00',
  },
  [ScheduleType.EVENING]: {
    startTime: '18:00',
    endTime: '21:00',
  },
};
