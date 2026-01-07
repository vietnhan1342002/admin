import { ShiftStatus, ShiftType } from '../enum/shift.enum';

export class ResponseDoctorShift {
  id: string;

  doctorId: string;

  shiftType: ShiftType;

  shiftDate: string;

  startTime: string | null;

  endTime: string | null;

  slotDurationMinutes: number;

  status: ShiftStatus;

  createdAt?: Date;

  updatedAt?: Date;
}
