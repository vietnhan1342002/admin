import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { NewsRepository } from './repositories/news.repository';
import { NewsMapper } from './mapper/news.mapper';
import { NewsCategoriesModule } from '../news-categories/news-categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), NewsCategoriesModule],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository, NewsMapper],
  exports: [NewsService, NewsRepository],
})
export class NewsModule {}
