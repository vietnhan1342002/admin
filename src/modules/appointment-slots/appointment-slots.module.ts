import { Module } from '@nestjs/common';
import { AppointmentSlotsService } from './appointment-slots.service';
import { AppointmentSlotsController } from './appointment-slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentSlot } from './entities/appointment-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentSlot])],
  controllers: [AppointmentSlotsController],
  providers: [AppointmentSlotsService],
  exports: [AppointmentSlotsService],
})
export class AppointmentSlotsModule {}
