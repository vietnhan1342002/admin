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
            firstName: entity.user.firstName,
            lastName: entity.user.lastName,
            avatarUrl: entity.user.avatarUrl || null,
            phone: entity.user.phone,
            isActive: entity.user.isActive,
            isVerifyEmail: entity.user.isVerifyEmail,
            createdAt: entity.user.createdAt,
          }
        : null,
      position: entity.position,
      status: entity.status,
      dateAdded: entity.dateAdded,
      createdAt: entity.createdAt,
    };
  }
}
