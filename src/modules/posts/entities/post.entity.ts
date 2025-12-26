import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, ManyToOne, Index, JoinColumn } from 'typeorm';
import { PostCategory, PostStatus } from '../enum/post.enum';

@Entity()
@Index(['slug', 'deletedAt'], { unique: true })
@Index(['status', 'publishedAt'])
@Index(['title'])
@Index(['views'])
export class Post extends BaseEntity {
  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  slug: string;

  @Column('text')
  content: string;

  @Column({ length: 500, nullable: true })
  summary: string;

  @Column({ nullable: true })
  authorId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'author_id' })
  author?: User;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

  @Column({ type: 'enum', enum: PostCategory, nullable: true })
  category: PostCategory;

  @Column({ default: 0 })
  views: number;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  publishedAt: Date;
}
