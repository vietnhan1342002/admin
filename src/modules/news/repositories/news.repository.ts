import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { News } from '../entities/news.entity';

@Injectable()
export class NewsRepository extends BaseRepository<News> {
  constructor(
    @InjectRepository(News) repo: Repository<News>,
    private readonly dataSource: DataSource,
  ) {
    super(repo, News, dataSource.createEntityManager());
  }
}
