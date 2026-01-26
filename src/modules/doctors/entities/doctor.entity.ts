import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, Index } from 'typeorm';
import { DoctorSpecialty } from '../enum/doctor.enum';

@Entity('doctors')
export class Doctor extends BaseEntity {
  @Index({ unique: true })
  @Column({})
  slug: string;

  @Column({ name: 'external_id', nullable: true })
  externalId: string;

  @Column({})
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({
    type: 'enum',
    enum: DoctorSpecialty,
    default: DoctorSpecialty.PEDIATRICS,
  })
  specialty: DoctorSpecialty;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  facility: string;

  @Column({ name: 'experience_years', type: 'int', default: 0 })
  experienceYears: number;

  @Column({ type: 'json', nullable: true })
  languages: string[];

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({ type: 'boolean', default: false })
  featured: boolean;

  // URL / CDN path
  @Column({ type: 'text', nullable: true })
  avatar: string;
}
