import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DoctorSlot } from '../entities/doctor-slot.entity';
import { DoctorSlotStatus } from '../enum/doctor-slot.enum';

@Injectable()
export class DoctorSlotRepository {
  private repo: Repository<DoctorSlot>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(DoctorSlot);
  }

  findByDoctorAndDate(doctorId: string, date: string) {
    return this.repo.find({
      where: { doctorId, date },
      order: { startTime: 'ASC' },
    });
  }

  findByShift(doctorShiftId: string) {
    return this.repo.find({
      where: { doctorShiftId },
      order: { startTime: 'ASC' },
    });
  }

  bulkInsert(slots: DoctorSlot[], manager = this.dataSource.manager) {
    return manager.getRepository(DoctorSlot).save(slots);
  }

  deleteByShift(doctorShiftId: string, manager = this.dataSource.manager) {
    return manager
      .getRepository(DoctorSlot)
      .createQueryBuilder()
      .delete()
      .where('doctor_shift_id = :id', { id: doctorShiftId })
      .execute();
  }

  /**
   * Lock slot when booking (anti double-booking)
   */
  async lockSlot(slotId: string, manager = this.dataSource.manager) {
    return manager
      .getRepository(DoctorSlot)
      .createQueryBuilder('slot')
      .setLock('pessimistic_write')
      .where('slot.id = :id', { id: slotId })
      .getOne();
  }

  updateStatus(id: string, status: DoctorSlotStatus) {
    return this.repo.update(id, { status });
  }
}
