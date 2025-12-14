import { Entity, Column, Index, Unique } from 'typeorm';
import { BannerPosition } from '../enum/bannerPosition.enum';
import { BannerStatus } from '../enum/bannerStatus.enum';
import { BaseEntity } from 'src/common/base/base.entity';
@Entity()
@Unique(['imageUrl'])
@Index(['title', 'deletedAt'], { unique: true })
@Index(['position', 'status', 'deletedAt'])
export class Banner extends BaseEntity {
  @Column({ length: 255 }) title: string;
  @Column() imageUrl: string;
  @Column({ nullable: true }) link: string;
  @Column({
    type: 'enum',
    enum: BannerPosition,
    default: BannerPosition.HOMEPAGE_TOP,
  })
  position: BannerPosition;
  @Column({ type: 'enum', enum: BannerStatus, default: BannerStatus.ACTIVE })
  status: BannerStatus;
  @Column({ nullable: true }) startAt: Date;
  @Column({ nullable: true }) endAt: Date;
}
