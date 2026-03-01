import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategory } from './entities/news-category.entity';
import { NewsCategoriesController } from './news-categories.controller';
import { NewsCategoryRepository } from './repositories/news-categories.repository';
import { NewsCategoriesService } from './news-categories.service';
import { NewsCategoryMapper } from './mapper/news-categories.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([NewsCategory])],
  controllers: [NewsCategoriesController],
  providers: [
    NewsCategoriesService,
    NewsCategoryRepository,
    NewsCategoryMapper,
  ],
  exports: [NewsCategoriesService],
})
export class NewsCategoriesModule {}
