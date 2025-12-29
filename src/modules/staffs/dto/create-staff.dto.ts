import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { StaffStatus } from '../enum/staff.enum';
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
export class CreateStaffDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsString()
  position: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(StaffStatus)
  status?: StaffStatus;

  @IsDateString()
  dateAdded: string;
}
