import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, Index } from 'typeorm';
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';

@Entity('doctors')
@Index('IDX_DOCTOR_FULLNAME', ['fullName'])
@Index('IDX_DOCTOR_STATUS_SPECIALTY', ['status', 'specialty'])
@Index(['contactEmail', 'deletedAt'], { unique: true })
@Index(['contactPhone', 'deletedAt'], { unique: true })
export class Doctor extends BaseEntity {
  @Column({ length: 200 })
  fullName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: DoctorSpecialty,
    default: DoctorSpecialty.PEDIATRICS,
  })
  specialty: DoctorSpecialty;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  experience: number;

  @Column({ nullable: true })
  degrees: string;

  @Column({ nullable: false })
  contactEmail: string;

  @Column({ nullable: false })
  contactPhone: string;

  @Column({ type: 'enum', enum: DoctorStatus, default: DoctorStatus.ACTIVE })
  status: DoctorStatus;
}
