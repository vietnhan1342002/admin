import { UserRole } from '../enum/user-role.enum';

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  createdAt?: Date;
  updatedAt?: Date;
}
