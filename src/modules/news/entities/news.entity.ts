import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { NewsStatus } from '../enum/news-status.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { NewsCategory } from 'src/modules/news-categories/entities/news-category.entity';

@Entity('news')
@Index(['authorId', 'deletedAt'])
@Index(['categoryId', 'deletedAt'])
@Index(['status', 'deletedAt'])
@Index(['slug', 'deletedAt'], { unique: true })
export class News extends BaseEntity {
  @Column({ name: 'author_id' })
  authorId: string;

  @ManyToOne(() => User, (user) => user.news, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ length: 250 })
  title: string;

  @Column({ length: 300 })
  shortDesc: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'category_id' })
  categoryId: string;
  @ManyToOne(() => NewsCategory, (category) => category.news, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: NewsCategory;

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({
    name: 'meta_title',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  metaTitle: string | null;

  @Column({ name: 'meta_desc', type: 'text', nullable: true })
  metaDesc: string | null;

  @Column({
    type: 'enum',
    enum: NewsStatus,
    default: NewsStatus.DRAFT,
  })
  status: NewsStatus;

  @Column({ type: 'text', nullable: true })
  thumbnail: string | null;

  @Column({ type: 'int', default: 0 })
  view: number;

  @Column({ length: 300, unique: true })
  slug: string;
}
