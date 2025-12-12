import { UserResponseDto } from '../dto/response-user.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles || [],
    };
  }

  static toListResponse(users: User[]): UserResponseDto[] {
    return users.map((user) => this.toResponse(user));
  }
}
