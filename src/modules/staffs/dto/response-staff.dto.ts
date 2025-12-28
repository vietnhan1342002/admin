import { StaffStatus } from '../enum/staff.enum';

export class StaffResponseDto {
  id: string;
  user: {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
  } | null;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  position: string;
  phone: string;
  status: StaffStatus;
  dateAdded: Date;
  createdAt: Date;
  updatedAt: Date;
}
