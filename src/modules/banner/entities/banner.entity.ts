import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
@Entity()
// @Index(['imageUrl', 'deletedAt'], { unique: true })
@Index(['name', 'deletedAt'], { unique: true })
@Index(['isActive', 'archive', 'viewOrder', 'deletedAt'])
@Index(['viewOrder', 'deletedAt'])
export class Banner extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ name: 'view_order', type: 'bigint' })
  viewOrder: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'varchar', length: 50, default: 'rgb(219, 234, 254)' })
  color: string;

  @Column({ type: 'int', default: 0 })
  archive: number;

  @Column({ name: 'image_url', type: 'varchar', length: 500, nullable: true })
  imageUrl: string;
}
