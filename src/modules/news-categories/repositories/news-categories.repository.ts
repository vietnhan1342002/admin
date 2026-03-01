import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { DataSource, Repository } from 'typeorm';
import { NewsCategory } from '../entities/news-category.entity';

@Injectable()
export class NewsCategoryRepository extends BaseRepository<NewsCategory> {
  constructor(
    @InjectRepository(NewsCategory) repo: Repository<NewsCategory>,
    datasource: DataSource,
  ) {
    super(repo, NewsCategory, datasource.createEntityManager());
  }
}
