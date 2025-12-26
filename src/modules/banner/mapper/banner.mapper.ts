import { BaseMapper } from 'src/common/base/base.mapper';
import { BannerReponseDto } from '../dto/response-banner.dto';
import { Banner } from '../entities/banner.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BannerMapper extends BaseMapper<Banner, BannerReponseDto> {
  toResponse(entity: Banner): BannerReponseDto {
    const dto = new BannerReponseDto();

    dto.id = entity.id;
    dto.title = entity.title;
    dto.imageUrl = entity.imageUrl;
    dto.redirectUrl = entity.redirectUrl;
    dto.position = entity.position;
    dto.status = entity.status;
    dto.startAt = entity.startAt;
    dto.endAt = entity.endAt;

    return dto;
  }
}
