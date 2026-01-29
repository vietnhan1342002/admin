// src/modules/departments/repositories/department.repository.ts
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentRepository extends BaseRepository<Department> {
  constructor(
    @InjectRepository(Department) repo: Repository<Department>,
    private readonly dataSource: DataSource,
  ) {
    super(repo, dataSource.createEntityManager());
  }
}
