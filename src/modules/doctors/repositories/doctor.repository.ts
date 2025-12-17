import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/base.repository';
import { Doctor } from '../entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorRepository extends BaseRepository<Doctor> {
  constructor(@InjectRepository(Doctor) repo: Repository<Doctor>) {
    super(repo);
  }
}
