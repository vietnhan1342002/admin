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
        entity.doctors?.map((doctor) => ({
          id: doctor.id,
          slug: doctor.slug,
          name: doctor.name,
          title: doctor.title,
          avatar: doctor.avatar,
          featured: doctor.featured,
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
