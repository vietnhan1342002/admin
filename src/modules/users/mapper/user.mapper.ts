import { BaseMapper } from 'src/common/base/base.mapper';
import { UserResponseDto } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';

export class UserMapper extends BaseMapper<User, UserResponseDto> {
  toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }
}
