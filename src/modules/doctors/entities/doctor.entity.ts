import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column } from 'typeorm';
import { DoctorSpecialty, DoctorStatus } from '../enum/doctor.enum';

@Entity()
export class Doctor extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ length: 100 })
  phone: string;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl?: string;

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
