import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { StaffStatus } from '../enum/staff.enum';

@Entity()
@Index(['userId', 'deletedAt'], { unique: true })
@Index(['position', 'deletedAt'])
@Index(['status', 'deletedAt'])
export class Staff extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 100 })
  position: string;

  @Column({
    type: 'enum',
    enum: StaffStatus,
    default: StaffStatus.ACTIVE,
  })
  status: StaffStatus;

  @Column({ name: 'slug', length: 150, unique: true })
  slug: string;

  @Column({ name: 'facility', type: 'varchar', nullable: true })
  facility: string;

  @Column({ name: 'featured', type: 'boolean', default: false })
  featured: boolean;
}
