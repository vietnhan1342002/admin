import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { News } from 'src/modules/news/entities/news.entity';

@Entity()
@Index(['name', 'deletedAt'], { unique: true })
export class NewsCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  icon: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  color: string;

  @Column({ name: 'total_news', type: 'int', default: 0 })
  totalNews: number;

  @OneToMany(() => News, (news) => news.category)
  news: News[];
}
