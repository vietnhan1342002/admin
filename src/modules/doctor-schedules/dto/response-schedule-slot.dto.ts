export class ScheduleSlotResponseDto {
  id: string;

  doctorId: string;
  doctorName?: string; // optional – tiện cho FE

  startTime: string; // HH:mm
  endTime: string; // HH:mm

  status: 'available' | 'booked' | 'blocked' | 'cancelled';
}
