// src/modules/specialties/mapper/specialty.mapper.ts
import { BaseMapper } from 'src/common/base/base.mapper';
import { Specialty } from '../entities/specialty.entity';
import { ResponseSpecialtyDto } from '../dto/response-specialty.dto';

export class SpecialtyMapper extends BaseMapper<
  Specialty,
  ResponseSpecialtyDto
> {
  toResponse(entity: Specialty): ResponseSpecialtyDto {
    return {
      id: entity.id,
      value: entity.value,
      name: entity.name,
      departmentId: entity.departmentId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
