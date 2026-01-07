import { Test, TestingModule } from '@nestjs/testing';
import { DoctorShiftsController } from './doctor-shifts.controller';
import { DoctorShiftsService } from './doctor-shifts.service';

describe('DoctorShiftsController', () => {
  let controller: DoctorShiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorShiftsController],
      providers: [DoctorShiftsService],
    }).compile();

    controller = module.get<DoctorShiftsController>(DoctorShiftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
