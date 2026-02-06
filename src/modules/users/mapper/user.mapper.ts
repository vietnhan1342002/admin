import { BaseMapper } from 'src/common/base/base.mapper';
import { UserResponseDto } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';

export class UserMapper extends BaseMapper<User, UserResponseDto> {
  toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,

      avatarUrl: user.avatarUrl || null,
      phone: user.phone,
      isActive: user.isActive,
      isVerifyEmail: user.isVerifyEmail,
      createdAt: user.createdAt,
    };
  }
}
