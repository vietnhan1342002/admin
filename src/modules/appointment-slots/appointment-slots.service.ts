import { Injectable } from '@nestjs/common';
import { CreateAppointmentSlotDto } from './dto/create-appointment-slot.dto';
import { UpdateAppointmentSlotDto } from './dto/update-appointment-slot.dto';

@Injectable()
export class AppointmentSlotsService {
  create(createAppointmentSlotDto: CreateAppointmentSlotDto) {
    return 'This action adds a new appointmentSlot';
  }

  findAll() {
    return `This action returns all appointmentSlots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointmentSlot`;
  }

  update(id: number, updateAppointmentSlotDto: UpdateAppointmentSlotDto) {
    return `This action updates a #${id} appointmentSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointmentSlot`;
  }
}
