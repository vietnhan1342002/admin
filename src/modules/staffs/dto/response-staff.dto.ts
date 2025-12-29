import { UserResponseDto } from 'src/modules/users/dto/response-user.dto';
import { StaffStatus } from '../enum/staff.enum';

export class StaffResponseDto {
  id: string;
  user: UserResponseDto | null;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  position: string;
  phone: string;
  status: StaffStatus;
  dateAdded: Date;
  createdAt: Date;
}
