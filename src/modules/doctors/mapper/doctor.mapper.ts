// src/modules/doctors/mapper/doctor.mapper.ts
import { BaseMapper } from 'src/common/base/base.mapper';
import { ResponseDoctorDto } from '../dto/response-doctor.dto';
import { Doctor } from '../entities/doctor.entity';

export class DoctorMapper extends BaseMapper<Doctor, ResponseDoctorDto> {
  toResponse(entity: Doctor): ResponseDoctorDto {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      phone: entity.phone,
      avatarUrl: entity.avatarUrl || null,
      specialty: entity.specialty,
      department: entity.department,
      experience: entity.experience,
      degrees: entity.degrees,
      status: entity.status,
      dateAdded: entity.dateAdded,
      createdAt: entity.createdAt,
    };
  }
}
