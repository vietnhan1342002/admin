import { UserRole } from '../enum/user-role.enum';

export class UserResponseDto {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
