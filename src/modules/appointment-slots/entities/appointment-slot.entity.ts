import { BaseEntity } from 'src/common/base/base.entity';
import { DoctorShift } from 'src/modules/doctor-shifts/entities/doctor-shift.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  VersionColumn,
} from 'typeorm';
import { SlotStatus } from '../enum/appointment-slot-status.enum';

@Entity('appointment_slots')
@Index(
  'ux_appointment_slot_unique',
  ['doctorShiftId', 'slotDate', 'startTime', 'deletedAt'],
  { unique: true },
)
export class AppointmentSlot extends BaseEntity {
  @Column({ name: 'doctor_shift_id', type: 'uuid' })
  doctorShiftId: string;

  @ManyToOne(() => DoctorShift, (shift) => shift.appointments, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'doctor_shift_id' })
  doctorShift: DoctorShift;

  @Column({ name: 'slot_date', type: 'date' })
  slotDate: string;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  @Column({
    type: 'enum',
    enum: SlotStatus,
    default: SlotStatus.AVAILABLE,
  })
  status: SlotStatus;

  @VersionColumn()
  version: number;
}
