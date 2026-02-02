// src/modules/specialties/entities/doctor-specialty.entity.ts
import { Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import { Specialty } from './specialty.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('doctor_specialties')
@Index('UQ_doctor_id_specialty_id', ['doctor', 'specialty'], { unique: true })
export class DoctorSpecialty extends BaseEntity {
  @ManyToOne(() => Doctor, (doctor) => doctor.doctorSpecialties, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctorSpecialties, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;
}
