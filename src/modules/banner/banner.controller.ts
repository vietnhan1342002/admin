import { Controller, Get, Param, Query } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { BaseController } from 'src/common/base/base.controller';
import { BannerReponseDto } from './dto/response-banner.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { BannerFilterDto } from './dto/filter-banner.dto';

@Controller('banner')
export class BannerController extends BaseController<
  CreateBannerDto,
  UpdateBannerDto,
  BannerReponseDto
> {
  constructor(private readonly bannerService: BannerService) {
    super(bannerService);
  }

  @Public()
  @Get()
  override findAll(@Query() filterDto: BannerFilterDto) {
    return super.findAll(filterDto);
  }

  @Public()
  @Get(':id')
  override findById(@Param('id') id: string) {
    return super.findById(id);
  }
}
