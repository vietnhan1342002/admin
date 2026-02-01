// src/modules/specialties/mapper/specialty.mapper.ts
import { BaseMapper } from 'src/common/base/base.mapper';
import { Specialty } from '../entities/specialty.entity';
import { ResponseSpecialtyDto } from '../dto/response-specialty.dto';
import { SpecialtySlimResponseDto } from '../dto/response-doctor-specialty.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
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
      doctors:
        entity.doctorSpecialties?.map((ds) => ({
          id: ds.doctor.id,
          slug: ds.doctor.slug,
          name: ds.doctor.name,
          title: ds.doctor.title,
          avatar: ds.doctor.avatar,
          featured: ds.doctor.featured,
        })) ?? [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toSlim(entity: Specialty): SpecialtySlimResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      value: entity.value,
      departmentId: entity.departmentId,
    };
  }
  toListSlimResponse(entities: Specialty[]): SpecialtySlimResponseDto[] {
    return entities.map((e) => this.toSlim(e));
  }
}
