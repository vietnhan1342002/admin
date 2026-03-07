import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { BaseService } from 'src/common/base/base.service';
import { PaginationParams } from 'src/common/base/base.repository';
import { CrudAction, Resource } from 'src/shared/Enum/messages';
import { buildCrudMessage } from 'src/shared/Helper/message.helper';
import { getEntityOrFail } from 'src/shared/utils/getEntityorFaild';
import { CreateNewsDto } from './dto/create-news.dto';
import { ResponseNewsDto } from './dto/response-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { NewsMapper } from './mapper/news.mapper';
import { NewsRepository } from './repositories/news.repository';
import { Staff } from '../staffs/entities/staff.entity';
import { NewsCategoriesService } from '../news-categories/news-categories.service';

@Injectable()
export class NewsService extends BaseService<
  News,
  CreateNewsDto,
  UpdateNewsDto,
  ResponseNewsDto
> {
  constructor(
    private readonly repo: NewsRepository,
    private readonly newCategoriesService: NewsCategoriesService,
    private readonly dataSource: DataSource,
    mapper: NewsMapper,
  ) {
    super(repo, mapper, Resource.NEWS);
  }

  protected async beforeCreate(data: CreateNewsDto): Promise<void> {
    await this.newCategoriesService.findById(data.categoryId);
  }

  protected async beforeUpdate(
    id: string,
    data: UpdateNewsDto,
    manager?: EntityManager,
  ): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.NEWS, CrudAction.NOT_FOUND),
    );

    if (data.authorId) {
      const entityManager = manager ?? this.dataSource.manager;
      const author = await entityManager.getRepository(Staff).findOne({
        where: { id: data.authorId },
      });

      if (!author) {
        throw new NotFoundException(
          buildCrudMessage(Resource.STAFF, CrudAction.NOT_FOUND),
        );
      }
    }
  }

  protected async beforeDelete(id: string): Promise<void> {
    await getEntityOrFail(
      this.repo,
      id,
      buildCrudMessage(Resource.NEWS, CrudAction.NOT_FOUND),
    );
  }

  override async findById(id: string): Promise<ResponseNewsDto> {
    return super.findById(id, {
      relations: ['author', 'author.user'],
    });
  }

  override async findAll(pagination?: PaginationParams) {
    return super.findAll(pagination, {
      relations: ['author', 'author.user'],
    });
  }
}
