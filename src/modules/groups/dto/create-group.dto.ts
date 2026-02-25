import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty({ message: 'Tên nhóm không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Mã nhóm không được để trống' })
  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
