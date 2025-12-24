import { UserRole } from '../enum/user-role.enum';

export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
