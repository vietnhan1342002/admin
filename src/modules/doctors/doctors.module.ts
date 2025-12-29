import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorMapper } from './mapper/doctor.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorsController],
  providers: [DoctorsService, DoctorRepository, DoctorMapper],
  exports: [DoctorsService, DoctorRepository],
})
export class DoctorsModule {}
