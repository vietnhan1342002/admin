import { IsOptional, IsString } from 'class-validator';

export class MoveBannerDto {
  @IsOptional()
  @IsString()
  prevId?: string;
  @IsOptional()
  @IsString()
  nextId?: string;
}
