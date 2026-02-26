// src/modules/doctors/mapper/doctor.mapper.ts
import { BaseMapper } from 'src/common/base/base.mapper';
import { ResponseDoctorDto } from '../dto/response-doctor.dto';
import { Doctor } from '../entities/doctor.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DoctorMapper extends BaseMapper<Doctor, ResponseDoctorDto> {
  toResponse(entity: Doctor): ResponseDoctorDto {
    return {
      id: entity.id,
      slug: entity.slug,
      externalId: entity.externalId || null,
      name: entity.name,
      title: entity.title || null,
      specialty: entity.specialty
        ? {
            id: entity.specialty.id,
            value: entity.specialty.value,
            name: entity.specialty.name,
            departmentId: entity.specialty.departmentId,
          }
        : null,

      department: entity.department || null,
      facility: entity.facility || null,
      experienceYears: entity.experienceYears,
      languages: entity.languages || [],
      tags: entity.tags || [],
      featured: entity.featured,
      avatar: entity.avatar || null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
