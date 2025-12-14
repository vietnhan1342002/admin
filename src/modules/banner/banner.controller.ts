import { Controller } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BaseController } from 'src/common/base/base.controller';
import { Banner } from './entities/banner.entity';
import { BannerReponseDto } from './dto/response-banner.dto';

@Controller('banner')
export class BannerController extends BaseController<
  Banner,
  CreateBannerDto,
  UpdateBannerDto,
  BannerReponseDto
> {
  constructor(private readonly bannerService: BannerService) {
    super(bannerService);
  }
}
