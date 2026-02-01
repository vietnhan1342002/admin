import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/base.repository';
import { Doctor } from '../entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DoctorRepository extends BaseRepository<Doctor> {
  constructor(
    @InjectRepository(Doctor) repo: Repository<Doctor>,
    private readonly dataSource: DataSource,
  ) {
    super(repo, Doctor, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Doctor | null> {
    const doctor = await this.repo.findOne({
      where: { id },
    });

    return doctor;
  }
}
