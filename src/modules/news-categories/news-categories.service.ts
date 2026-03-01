import { ConflictException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news-category.dto';
import { ResponseNewsCategoryDto } from './dto/response-news-category.dto';
import { NewsCategory } from './entities/news-category.entity';
import { Resource, CrudAction } from 'src/shared/Enum/messages';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { IsNull } from 'typeorm';
import { NewsCategoryRepository } from './repositories/news-categories.repository';
import { NewsCategoryMapper } from './mapper/news-categories.mapper';

@Injectable()
export class NewsCategoriesService extends BaseService<
  NewsCategory,
  CreateNewsCategoryDto,
  UpdateNewsCategoryDto,
  ResponseNewsCategoryDto
> {
  constructor(
    private readonly repo: NewsCategoryRepository,
    mapper: NewsCategoryMapper,
  ) {
    super(repo, mapper, Resource.NEWS_CATEGORY);
  }

  protected async beforeCreate(data: CreateNewsCategoryDto): Promise<void> {
    const duplicatedName = await this.repo.findOne({
      name: data.name,
      deletedAt: IsNull(),
    });

    if (duplicatedName) {
      throw new ConflictException(
        buildCrudMessage(Resource.NEWS_CATEGORY, CrudAction.ALREADY_EXISTS),
      );
    }
  }

  protected async beforeUpdate(
    id: string,
    data: UpdateNewsCategoryDto,
  ): Promise<void> {
    const category = await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.NEWS_CATEGORY, CrudAction.NOT_FOUND),
    );

    if (data.name && data.name !== category.name) {
      const duplicatedName = await this.repo.findOne({
        name: data.name,
        deletedAt: IsNull(),
      });

      if (duplicatedName) {
        throw new ConflictException(
          buildCrudMessage(Resource.NEWS_CATEGORY, CrudAction.ALREADY_EXISTS),
        );
      }
    }
  }

  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.NEWS_CATEGORY, CrudAction.NOT_FOUND),
    );
  }
}
