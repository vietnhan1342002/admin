import { UserResponseDto } from 'src/modules/users/dto/response-user.dto';
import { StaffStatus } from '../enum/staff.enum';

export class StaffResponseDto {
  id: string;
  user: UserResponseDto | null;
  position: string;
  status: StaffStatus;
  dateAdded: Date;
  createdAt: Date;
}
