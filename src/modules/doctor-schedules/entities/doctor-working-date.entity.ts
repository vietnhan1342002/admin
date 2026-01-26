import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
} from 'typeorm';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { DoctorWorkingDateStatus } from '../enum/doctor-working-date.enum';
import { BaseEntity } from 'src/common/base/base.entity';
import { DoctorShift } from './doctor-shift.entity';

@Entity('doctor_working_date')
@Index('UQ_doctor_working_date_doctor_id_date', ['doctor', 'date'], {
  unique: true,
})
@Index('IDX_doctor_working_date_date', ['date'])
export class DoctorWorkingDate extends BaseEntity {
  @ManyToOne(() => Doctor, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({ type: 'date' })
  date: string; // yyyy-mm-dd

  @Column({
    type: 'enum',
    enum: DoctorWorkingDateStatus,
    default: DoctorWorkingDateStatus.DRAFT,
  })
  status: DoctorWorkingDateStatus;

  @OneToMany(() => DoctorShift, (shift) => shift.doctorWorkingDate)
  shifts: DoctorShift[];
}
