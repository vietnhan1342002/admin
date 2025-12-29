import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { StaffStatus } from '../enum/staff.enum';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
export class CreateStaffDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsString()
  position: string;

  @IsOptional()
  @IsEnum(StaffStatus)
  status?: StaffStatus;

  @IsDateString()
  dateAdded: string;
}
