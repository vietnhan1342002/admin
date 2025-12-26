import { BannerPosition } from '../enum/bannerPosition.enum';
import { BannerStatus } from '../enum/bannerStatus.enum';

export class BannerReponseDto {
  id: string;
  title: string;
  imageUrl: string;
  redirectUrl?: string;
  position: BannerPosition;
  status: BannerStatus;
  startAt?: Date;
  endAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
