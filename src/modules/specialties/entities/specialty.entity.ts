// src/modules/specialties/entities/specialty.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { Department } from 'src/modules/departments/entities/department.entity';
import { DoctorSpecialty } from './doctor-specialty.entity';

@Entity('specialties')
export class Specialty extends BaseEntity {
  @Index({ unique: true })
  @Column()
  value: string;

  @Column()
  name: string;

  @Column({ name: 'department_id' })
  departmentId: string;

  @ManyToOne(() => Department, { eager: false })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(
    () => DoctorSpecialty,
    (doctorSpecialty) => doctorSpecialty.specialty,
  )
  doctorSpecialties: DoctorSpecialty[];
}
