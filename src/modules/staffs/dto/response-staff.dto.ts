import { UserResponseDto } from 'src/modules/users/dto/response-user.dto';
import { StaffStatus } from '../enum/staff.enum';

export class StaffResponseDto {
  id: string;
  user: UserResponseDto | null;
  slug: string;
  position: string;
  facility: string | null;
  featured: boolean;
  status: StaffStatus;
}
