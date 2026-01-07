import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentSlotsService } from './appointment-slots.service';

describe('AppointmentSlotsService', () => {
  let service: AppointmentSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentSlotsService],
    }).compile();

    service = module.get<AppointmentSlotsService>(AppointmentSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
