import { Entity, Column, OneToMany, Index } from 'typeorm';
import { ScheduleSlot } from './schedule-slot.entity';
import { ScheduleStatus } from '../enum/schedule-status.enum';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('schedules')
@Index(['scheduleDate'], { unique: true })
export class Schedule extends BaseEntity {
  // ======================
  // Business date
  // ======================

  @Column({ name: 'schedule_date', type: 'date' })
  scheduleDate: string;
  // ======================
  // Status
  // ======================

  @Column({
    type: 'enum',
    enum: ScheduleStatus,
  })
  status: ScheduleStatus;

  // ======================
  // Relations
  // ======================

  @OneToMany(() => ScheduleSlot, (slot) => slot.schedule)
  slots: ScheduleSlot[];
}
