import { Entity, Column, Index } from 'typeorm';
import { BannerPosition } from '../enum/bannerPosition.enum';
import { BannerStatus } from '../enum/bannerStatus.enum';
import { BaseEntity } from 'src/common/base/base.entity';
@Entity()
@Index(['imageUrl', 'deletedAt'], { unique: true })
@Index(['title', 'deletedAt'], { unique: true })
@Index(['status', 'deletedAt'])
export class Banner extends BaseEntity {
  @Column({ length: 255 })
  title: string;

  @Column({ name: 'image_url', type: 'varchar', length: 500 })
  imageUrl: string;

  @Column({
    name: 'ridirect_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  redirectUrl: string;

  @Column({
    type: 'enum',
    enum: BannerPosition,
    default: BannerPosition.HOMEPAGE_TOP,
  })
  position: BannerPosition;

  @Column({ type: 'enum', enum: BannerStatus, default: BannerStatus.ACTIVE })
  status: BannerStatus;

  @Column({ nullable: true })
  startAt: Date;

  @Column({ nullable: true })
  endAt: Date;
}
