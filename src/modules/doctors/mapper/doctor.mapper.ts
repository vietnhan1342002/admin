// src/modules/doctors/mapper/doctor.mapper.ts
import { BaseMapper } from 'src/common/base/base.mapper';
import { ResponseDoctorDto } from '../dto/response-doctor.dto';
import { Doctor } from '../entities/doctor.entity';

export class DoctorMapper extends BaseMapper<Doctor, ResponseDoctorDto> {
  toResponse(entity: Doctor): ResponseDoctorDto {
    return {
      id: entity.id,
      fullName: entity.fullName,
      avatar: entity.avatar,
      specialty: entity.specialty,
      description: entity.description,
      experience: entity.experience,
      degrees: entity.degrees,
      contactEmail: entity.contactEmail,
      contactPhone: entity.contactPhone,
      status: entity.status,
    };
  }
}
