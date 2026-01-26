import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { DoctorShift } from './doctor-shift.entity';
import { BaseEntity } from 'src/common/base/base.entity';
import { DoctorSlotStatus } from '../enum/doctor-slot.enum';

@Entity('doctor_slots')
@Index(['doctorId', 'date', 'startTime'])
export class DoctorSlot extends BaseEntity {
  @Column({ name: 'doctor_id', type: 'varchar' })
  doctorId: string;

  @Column({
    name: 'doctor_shift_id',
    type: 'varchar',
    nullable: true,
  })
  doctorShiftId: string | null;

  @ManyToOne(() => DoctorShift, (shift) => shift.slots, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  doctorShift: DoctorShift | null;

  @Column({ type: 'date' })
  date: string;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  @Column({
    type: 'enum',
    enum: DoctorSlotStatus,
    default: DoctorSlotStatus.AVAILABLE,
  })
  status: DoctorSlotStatus;
}
