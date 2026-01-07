import { BaseEntity } from 'src/common/base/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ShiftStatus, ShiftType } from '../enum/shift.enum';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { AppointmentSlot } from 'src/modules/appointment-slots/entities/appointment-slot.entity';

@Entity()
@Index('idx_doctor_shift_doctor_id', ['doctorId', 'deletedAt'])
@Index('idx_doctor_shift_doctor_date_active', [
  'doctorId',
  'shiftDate',
  'deletedAt',
])
@Index('idx_doctor_shift_doctor_status_active', [
  'doctorId',
  'status',
  'deletedAt',
])
@Index('idx_doctor_shift_date_active', ['shiftDate', 'deletedAt'])
@Index('idx_doctor_shift_status_active', ['status', 'deletedAt'])
export class DoctorShift extends BaseEntity {
  @Column({ name: 'doctor_id', type: 'uuid' })
  doctorId: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.shifts, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({
    name: 'shift_type',
    type: 'enum',
    enum: ShiftType,
  })
  shiftType: ShiftType;

  @Column({ name: 'shift_date', type: 'date' })
  shiftDate: string;

  @Column({ name: 'start_time', type: 'time', nullable: true })
  startTime: string;

  @Column({ name: 'end_time', type: 'time', nullable: true })
  endTime: string;

  @Column({ name: 'slot_duration_minutes', type: 'int', default: 30 })
  slotDurationMinutes: number;

  @Column({
    type: 'enum',
    enum: ShiftStatus,
    default: ShiftStatus.PLANNED,
  })
  status: ShiftStatus;

  @OneToMany(() => AppointmentSlot, (appointment) => appointment.doctorShift)
  appointments: AppointmentSlot[];
}
