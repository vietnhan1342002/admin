import { Module } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor-schedules.service';
import { DoctorSchedulesController } from './doctor-schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorWorkingDate } from './entities/doctor-working-date.entity';
import { DoctorShift } from './entities/doctor-shift.entity';
import { DoctorSlot } from './entities/doctor-slot.entity';
import { DoctorWorkingDateRepository } from './repositories/doctor-working-date.repository';
import { DoctorShiftRepository } from './repositories/doctor-shift.repository';
import { DoctorSlotRepository } from './repositories/doctor-slot.repository';
import { DoctorScheduleMapper } from './mappers/doctor-schedules.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorWorkingDate, DoctorShift, DoctorSlot]),
  ],
  controllers: [DoctorSchedulesController],
  providers: [
    DoctorSchedulesService,
    DoctorWorkingDateRepository,
    DoctorShiftRepository,
    DoctorSlotRepository,
    DoctorScheduleMapper,
  ],
  exports: [DoctorSchedulesService],
})
export class DoctorSchedulesModule {}
