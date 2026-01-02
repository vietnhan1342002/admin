import { UserRole } from '../enum/user-role.enum';

export class UserResponseDto {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  phone: string;
  isActive: boolean;
  isVerifyEmail: boolean;
  createdAt: Date;
}
