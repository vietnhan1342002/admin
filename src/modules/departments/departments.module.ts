// src/modules/departments/departments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DepartmentRepository } from './repositories/department.repository';
import { DepartmentMapper } from './mapper/department.mapper';
import { SpecialtyMapper } from '../specialties/mapper/specialty.mapper';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Department]), GroupsModule],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    DepartmentRepository,
    DepartmentMapper,
    SpecialtyMapper,
  ],
  exports: [DepartmentsService, DepartmentRepository],
})
export class DepartmentsModule {}
