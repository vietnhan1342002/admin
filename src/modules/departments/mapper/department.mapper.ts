// src/modules/departments/mapper/department.mapper.ts
import { BaseMapper } from 'src/common/base/base.mapper';
import { Department } from '../entities/department.entity';
import { ResponseDepartmentDto } from '../dto/response-department.dto';
import { Injectable } from '@nestjs/common';
import { SpecialtyMapper } from 'src/modules/specialties/mapper/specialty.mapper';

@Injectable()
export class DepartmentMapper extends BaseMapper<
  Department,
  ResponseDepartmentDto
> {
  constructor(private readonly specialtyMapper: SpecialtyMapper) {
    super();
  }
  toResponse(entity: Department): ResponseDepartmentDto {
    return {
      id: entity.id,
      value: entity.value,
      name: entity.name,
      block: entity.block || null,
      icon: entity.icon || null,
      specialties: this.specialtyMapper.toListSlimResponse(
        entity.specialties ?? [],
      ),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
