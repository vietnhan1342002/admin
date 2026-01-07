import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { BannerStatus } from '../enum/bannerStatus.enum';
import { BannerPosition } from '../enum/bannerPosition.enum';

export class CreateBannerDto {
  @IsString()
  title: string;

  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsString()
  redirectUrl?: string;

  @IsOptional()
  @IsEnum(BannerPosition)
  position?: BannerPosition; // default sẽ được entity set

  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus; // default = ACTIVE

  @IsOptional()
  @IsDateString()
  startAt?: Date;

  @IsOptional()
  @IsDateString()
  endAt?: Date;
}
