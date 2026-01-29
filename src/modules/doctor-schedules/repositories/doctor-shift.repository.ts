import { Injectable } from '@nestjs/common';
import { DataSource, Repository, In } from 'typeorm';
import { DoctorShift } from '../entities/doctor-shift.entity';
import { DoctorShiftStatus } from '../enum/doctor-shift.enum';

@Injectable()
export class DoctorShiftRepository {
  private repo: Repository<DoctorShift>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(DoctorShift);
  }

  findByWorkingDate(doctorWorkingDateId: string) {
    return this.repo.find({
      where: { doctorWorkingDate: { id: doctorWorkingDateId } },
      order: { startTime: 'ASC' },
    });
  }

  findDirtyByWorkingDate(doctorWorkingDateId: string) {
    return this.repo.find({
      where: {
        doctorWorkingDate: { id: doctorWorkingDateId },
        status: In([DoctorShiftStatus.DIRTY, DoctorShiftStatus.SYNC_ERROR]),
      },
    });
  }

  findOrFail(id: string) {
    return this.repo.findOneOrFail({ where: { id } });
  }

  save(entity: DoctorShift) {
    return this.repo.save(entity);
  }

  softDelete(id: string) {
    return this.repo.softDelete(id);
  }

  updateStatus(id: string, status: DoctorShiftStatus) {
    return this.repo.update(id, { status });
  }

  /**
   * Lock shifts when syncing slots
   */
  async lockByWorkingDate(
    doctorWorkingDateId: string,
    manager = this.dataSource.manager,
  ) {
    return manager
      .getRepository(DoctorShift)
      .createQueryBuilder('shift')
      .setLock('pessimistic_write')
      .where('shift.doctor_working_date_id = :id', {
        id: doctorWorkingDateId,
      })
      .andWhere('shift.deleted_at IS NULL')
      .getMany();
  }
}
