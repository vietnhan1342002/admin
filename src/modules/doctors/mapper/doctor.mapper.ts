// src/modules/doctors/mapper/doctor.mapper.ts
import { BaseMapper } from 'src/common/base/base.mapper';
import { ResponseDoctorDto } from '../dto/response-doctor.dto';
import { Doctor } from '../entities/doctor.entity';

export class DoctorMapper extends BaseMapper<Doctor, ResponseDoctorDto> {
  toResponse(entity: Doctor): ResponseDoctorDto {
    return {
      id: entity.id,
      user: entity.user
        ? {
            id: entity.user.id,
            email: entity.user.email,
            role: entity.user.role,
            firstName: entity.user.firstName,
            lastName: entity.user.lastName,
            avatarUrl: entity.user.avatarUrl || null,
            phone: entity.user.phone,
            isActive: entity.user.isActive,
            createdAt: entity.user.createdAt,
          }
        : null,
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
