export enum DoctorShiftType {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  FULL_DAY = 'full_day',
  CUSTOM = 'custom',
}

export enum DoctorShiftStatus {
  DIRTY = 'dirty',
  SYNCING = 'syncing',
  SYNCED = 'synced',
  SYNC_ERROR = 'syncError',
}
