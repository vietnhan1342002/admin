// src/modules/doctors/mapper/doctor.mapper.ts
import { BaseMapper } from 'src/common/base/base.mapper';
import { ResponseDoctorDto } from '../dto/response-doctor.dto';
import { Doctor } from '../entities/doctor.entity';

export class DoctorMapper extends BaseMapper<Doctor, ResponseDoctorDto> {
  toResponse(entity: Doctor): ResponseDoctorDto {
    return {
      id: entity.id,
      specialty: entity.specialty,
      department: entity.department,
      experience: entity.experience,
      degrees: entity.degrees,
      status: entity.status,
      dateAdded: entity.dateAdded,
      createdAt: entity.createdAt,

      staff: entity.staff
        ? {
            id: entity.staff.id,
            firstName: entity.staff.firstName,
            lastName: entity.staff.lastName,
            phone: entity.staff.phone,
            position: entity.staff.position,
            status: entity.staff.status,
            dateAdded: entity.staff.dateAdded,
            createdAt: entity.staff.createdAt,

            user: entity.staff.user
              ? {
                  id: entity.staff.user.id,
                  email: entity.staff.user.email,
                  role: entity.staff.user.role,
                  isActive: entity.staff.user.isActive,
                  createdAt: entity.staff.user.createdAt,
                }
              : null,
          }
        : null,
    };
  }
}
