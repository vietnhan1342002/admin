import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DoctorWorkingDate } from '../entities/doctor-working-date.entity';

@Injectable()
export class DoctorWorkingDateRepository {
  private repo: Repository<DoctorWorkingDate>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(DoctorWorkingDate);
  }

  findByDoctorAndDate(doctorId: string, date: string) {
    return this.repo.findOne({
      where: { doctor: { id: doctorId }, date },
      relations: ['shifts'],
    });
  }

  findOrFail(id: string) {
    return this.repo.findOneOrFail({ where: { id } });
  }

  create(entity: DoctorWorkingDate) {
    return this.repo.save(entity);
  }

  updateStatus(id: string, status: DoctorWorkingDate['status']) {
    return this.repo.update(id, { status });
  }

  /**
   * Lock working date when syncing shifts → slots
   */
  async lockByDoctorAndDate(
    doctorId: string,
    date: string,
    manager = this.dataSource.manager,
  ) {
    return manager
      .getRepository(DoctorWorkingDate)
      .createQueryBuilder('dwd')
      .setLock('pessimistic_write')
      .where('dwd.doctor_id = :doctorId', { doctorId })
      .andWhere('dwd.date = :date', { date })
      .getOne();
  }
}
