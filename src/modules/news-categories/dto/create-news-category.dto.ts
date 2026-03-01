import { IsOptional, IsString } from 'class-validator';

export class CreateNewsCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
