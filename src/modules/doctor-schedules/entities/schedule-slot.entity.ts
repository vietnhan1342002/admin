import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { ScheduleSlotStatus } from '../enum/schedule-slot-status.enum';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('schedule_slots')
@Index(['scheduleId'])
@Index(['doctorId'])
@Index(['startTime', 'endTime'])
export class ScheduleSlot extends BaseEntity {
  // ======================
  // Relations
  // ======================

  @Column({ name: 'schedule_id', type: 'varchar' })
  scheduleId: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.slots, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @Column({ name: 'doctor_id', type: 'varchar' })
  doctorId: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.scheduleSlots, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  // ======================
  // Time range
  // ======================

  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  // ======================
  // Status
  // ======================

  @Column({
    type: 'enum',
    enum: ScheduleSlotStatus,
  })
  status: ScheduleSlotStatus;
}
