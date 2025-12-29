import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
@Index('IDX_DOCTOR_STATUS_SPECIALTY', ['status', 'specialty'])
export class Doctor extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: DoctorSpecialty,
    default: DoctorSpecialty.PEDIATRICS,
  })
  specialty: DoctorSpecialty;

  @Column({ type: 'varchar', length: 200, nullable: true })
  department: string;

  @Column({ type: 'int', nullable: true })
  experience: number;

  @Column({ type: 'varchar', nullable: true })
  degrees: string;

  @Column({ type: 'enum', enum: DoctorStatus, default: DoctorStatus.ACTIVE })
  status: DoctorStatus;

  @Column({ name: 'date_added', type: 'date' })
  dateAdded: Date;
}
