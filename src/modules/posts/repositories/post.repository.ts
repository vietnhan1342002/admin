import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base/base.repository';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(@InjectRepository(Post) repo: Repository<Post>) {
    super(repo);
  }
  findBySlug(slug: string): Promise<Post | null> {
    return this.repo.findOne({
      where: { slug, deletedAt: IsNull() },
    });
  }
}
