// src/modules/specialties/specialties.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { DoctorSpecialty } from './entities/doctor-specialty.entity';
import { SpecialtiesController } from './specialties.controller';
import { SpecialtiesService } from './specialties.service';
import { SpecialtyRepository } from './repositories/specialty.repository';
import { SpecialtyMapper } from './mapper/specialty.mapper';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specialty, DoctorSpecialty]),
    DepartmentsModule,
  ],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService, SpecialtyRepository, SpecialtyMapper],
  exports: [SpecialtiesService, SpecialtyMapper],
})
export class SpecialtiesModule {}
