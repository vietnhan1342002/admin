// src/modules/specialties/repositories/specialty.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Specialty } from '../entities/specialty.entity';

@Injectable()
export class SpecialtyRepository extends BaseRepository<Specialty> {
  constructor(
    @InjectRepository(Specialty) repo: Repository<Specialty>,
    dataSource: DataSource,
  ) {
    super(repo, dataSource.createEntityManager());
  }
}
