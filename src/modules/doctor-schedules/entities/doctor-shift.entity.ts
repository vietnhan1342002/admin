import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { DoctorWorkingDate } from './doctor-working-date.entity';
import { DoctorShiftStatus, DoctorShiftType } from '../enum/doctor-shift.enum';
import { BaseEntity } from 'src/common/base/base.entity';
import { DoctorSlot } from './doctor-slot.entity';

@Entity('doctor_shifts')
export class DoctorShift extends BaseEntity {
  @ManyToOne(() => DoctorWorkingDate, (date) => date.shifts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_working_date_id' })
  doctorWorkingDate: DoctorWorkingDate;

  @Column({
    name: 'shift_type',
    type: 'enum',
    enum: DoctorShiftType,
  })
  shiftType: DoctorShiftType;

  @Column({
    type: 'enum',
    enum: DoctorShiftStatus,
    default: DoctorShiftStatus.DIRTY,
  })
  status: DoctorShiftStatus;

  @Column({ name: 'color_name', type: 'varchar', nullable: true })
  colorName: string | null;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string; // HH:mm

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  @Column({ name: 'slot_duration_minutes', type: 'int' })
  slotDurationMinutes: number;

  @OneToMany(() => DoctorSlot, (slot) => slot.doctorShift)
  slots: DoctorSlot[];
}
