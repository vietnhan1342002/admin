import { BaseMapper } from 'src/common/base/base.mapper';
import { Staff } from '../entities/staff.entity';
import { StaffResponseDto } from '../dto/response-staff.dto';

export class StaffMapper extends BaseMapper<Staff, StaffResponseDto> {
  toResponse(entity: Staff): StaffResponseDto {
    return {
      id: entity.id,
      user: entity.user
        ? {
            id: entity.user.id,
            email: entity.user.email,
            role: entity.user.role,
            isActive: entity.user.isActive,
            createdAt: entity.user.createdAt,
          }
        : null,
      firstName: entity.firstName,
      lastName: entity.lastName,
      position: entity.position,
      phone: entity.phone,
      status: entity.status,
      dateAdded: entity.dateAdded,
      createdAt: entity.createdAt,
    };
  }
}
