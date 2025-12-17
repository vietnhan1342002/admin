import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { BannerReponseDto } from './dto/response-banner.dto';
import { BaseService } from 'src/common/base/base.service';
import { BannerRepository } from './repositories/banner.repository';
import { BannerMapper } from './mapper/banner.mapper';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { IsNull } from 'typeorm';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';

@Injectable()
export class BannerService extends BaseService<
  Banner,
  CreateBannerDto,
  UpdateBannerDto,
  BannerReponseDto
> {
  constructor(
    private readonly repo: BannerRepository,
    mapper: BannerMapper,
  ) {
    super(repo, mapper);
  }
  /**
   * Hook trước khi tạo post
   */
  protected async beforeCreate(data: CreateBannerDto): Promise<void> {
    // Kiểm tra trùng imageUrl
    const existed = await this.repo.findOne({
      imageUrl: data.imageUrl,
      deletedAt: IsNull(),
    });

    if (existed) {
      throw new ConflictException(
        buildCrudMessage(Resource.BANNER, CrudAction.ALREADY_EXISTS),
      );
    }
  }

  /**
   * Hook trước khi update banner
   */
  protected async beforeUpdate(
    id: string,
    data: UpdateBannerDto,
  ): Promise<void> {
    const banner = await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.BANNER, CrudAction.NOT_FOUND),
    );

    // Nếu update imageUrl → phải check unique
    if (data.imageUrl && data.imageUrl !== banner.imageUrl) {
      const existed = await this.repo.findOne({
        imageUrl: data.imageUrl,
        deletedAt: IsNull(),
      });
      if (existed) {
        throw new ConflictException(
          buildCrudMessage(Resource.BANNER, CrudAction.ALREADY_EXISTS),
        );
      }
    }
  }

  /**
   * Hook trước khi delete (soft delete)
   */
  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.BANNER, CrudAction.NOT_FOUND),
    );

    // Có thể check business rule ở đây
  }
}
