import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentSlotsController } from './appointment-slots.controller';
import { AppointmentSlotsService } from './appointment-slots.service';

describe('AppointmentSlotsController', () => {
  let controller: AppointmentSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentSlotsController],
      providers: [AppointmentSlotsService],
    }).compile();

    controller = module.get<AppointmentSlotsController>(AppointmentSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
