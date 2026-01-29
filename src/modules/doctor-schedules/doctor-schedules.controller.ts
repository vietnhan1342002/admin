import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { DoctorSchedulesService } from './doctor-schedules.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';

@Public()
@Controller('doctor-schedules')
export class DoctorSchedulesController {
  constructor(
    private readonly doctorSchedulesService: DoctorSchedulesService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDoctorSchedule(
    @Body() createDoctorScheduleDto: CreateDoctorScheduleDto,
  ): Promise<{ message: string }> {
    console.log(createDoctorScheduleDto.data);

    await this.doctorSchedulesService.createDoctorSchedule(
      createDoctorScheduleDto.data,
    );

    return {
      message: 'Doctor schedule created successfully',
    };
  }
}
