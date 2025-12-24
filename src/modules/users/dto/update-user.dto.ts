import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
