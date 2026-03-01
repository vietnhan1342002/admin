import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateBannerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  viewOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  archive?: number;

  @IsUrl()
  imageUrl: string;
}
