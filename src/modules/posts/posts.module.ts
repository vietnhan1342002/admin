import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './repositories/post.repository';
import { UserContextService } from 'src/common/base/user.context';
import { PostMapper } from './mapper/post.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, PostRepository, UserContextService, PostMapper],
  exports: [PostsService],
})
export class PostsModule {}
