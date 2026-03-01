import { BaseMapper } from 'src/common/base/base.mapper';
import { BannerReponseDto } from '../dto/response-banner.dto';
import { Banner } from '../entities/banner.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BannerMapper extends BaseMapper<Banner, BannerReponseDto> {
  toResponse(entity: Banner): BannerReponseDto {
    const dto = new BannerReponseDto();

    dto.id = entity.id;
    dto.name = entity.name;
    dto.viewOrder = entity.viewOrder;
    dto.isActive = entity.isActive;
    dto.url = entity.url;
    dto.color = entity.color;
    dto.archive = entity.archive;
    dto.imageUrl = entity.imageUrl;

    return dto;
  }
}
