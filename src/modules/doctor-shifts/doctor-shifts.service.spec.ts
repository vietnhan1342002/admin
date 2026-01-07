import { Test, TestingModule } from '@nestjs/testing';
import { DoctorShiftsService } from './doctor-shifts.service';

describe('DoctorShiftsService', () => {
  let service: DoctorShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorShiftsService],
    }).compile();

    service = module.get<DoctorShiftsService>(DoctorShiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
