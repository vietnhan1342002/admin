import { Module } from '@nestjs/common';
import { DoctorShiftsService } from './doctor-shifts.service';
import { DoctorShiftsController } from './doctor-shifts.controller';
import { DoctorShift } from './entities/doctor-shift.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorShift])],
  controllers: [DoctorShiftsController],
  providers: [DoctorShiftsService],
  exports: [DoctorShiftsService],
})
export class DoctorShiftsModule {}
