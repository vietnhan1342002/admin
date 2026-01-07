import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentSlotsService } from './appointment-slots.service';
import { CreateAppointmentSlotDto } from './dto/create-appointment-slot.dto';
import { UpdateAppointmentSlotDto } from './dto/update-appointment-slot.dto';

@Controller('appointment-slots')
export class AppointmentSlotsController {
  constructor(
    private readonly appointmentSlotsService: AppointmentSlotsService,
  ) {}

  @Post()
  create(@Body() createAppointmentSlotDto: CreateAppointmentSlotDto) {
    return this.appointmentSlotsService.create(createAppointmentSlotDto);
  }

  @Get()
  findAll() {
    return this.appointmentSlotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentSlotsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentSlotDto: UpdateAppointmentSlotDto,
  ) {
    return this.appointmentSlotsService.update(+id, updateAppointmentSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentSlotsService.remove(+id);
  }
}
