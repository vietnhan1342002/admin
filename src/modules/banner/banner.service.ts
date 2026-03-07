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
import {
  calculateOrder,
  ORDER_STEP,
} from 'src/shared/Helper/caculationViewOrder.helper';
import { BannerFilterDto } from './dto/filter-banner.dto';

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
    super(repo, mapper, Resource.BANNER);
  }
  /**
   * Hook trước khi tạo post
   */
  protected async beforeCreate(data: CreateBannerDto): Promise<void> {
    const [duplicatedImage, duplicatedName] = await Promise.all([
      this.repo.findOne({
        imageUrl: data.imageUrl,
        deletedAt: IsNull(),
      }),
      this.repo.findOne({
        name: data.name,
        deletedAt: IsNull(),
      }),
    ]);

    if (duplicatedImage || duplicatedName) {
      console.log('duplicatedImage:', duplicatedImage);
      console.log('duplicatedName:', duplicatedName);

      throw new ConflictException(
        buildCrudMessage(Resource.BANNER, CrudAction.ALREADY_EXISTS),
      );
    }

    const { prevId, nextId } = data;
    const [prev, next] = await Promise.all([
      prevId ? this.repo.findById(prevId) : null,
      nextId ? this.repo.findById(nextId) : null,
    ]);
    let viewOrder: number;
    if (!prev && !next) {
      const last = await this.repo.findOne(
        { deletedAt: IsNull() },
        {
          order: { viewOrder: 'DESC' },
        },
      );
      viewOrder = last ? last.viewOrder + ORDER_STEP : ORDER_STEP;
    } else {
      viewOrder = calculateOrder(prev, next);
    }
    data.viewOrder = viewOrder;
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

    const [duplicatedImage, duplicatedName] = await Promise.all([
      data.imageUrl && data.imageUrl !== banner.imageUrl
        ? this.repo.findOne({
            imageUrl: data.imageUrl,
            deletedAt: IsNull(),
          })
        : null,
      data.name && data.name !== banner.name
        ? this.repo.findOne({
            name: data.name,
            deletedAt: IsNull(),
          })
        : null,
    ]);

    if (duplicatedImage || duplicatedName) {
      throw new ConflictException(
        buildCrudMessage(Resource.BANNER, CrudAction.ALREADY_EXISTS),
      );
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

  findActive() {
    return this.repo.findActive();
  }

  override async findAll(filterDto: BannerFilterDto) {
    return super.findAll({
      ...filterDto,
      sortBy: 'viewOrder',
      order: 'ASC',
    });
  }
}
