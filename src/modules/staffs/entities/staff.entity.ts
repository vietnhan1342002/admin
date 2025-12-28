import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { StaffStatus } from '../enum/staff.enum';

@Entity()
@Index(['userId', 'deletedAt'], { unique: true })
@Index(['firstName', 'deletedAt'])
@Index(['lastName', 'deletedAt'])
@Index(['position', 'deletedAt'])
@Index(['phone', 'deletedAt'], { unique: true })
@Index(['status', 'deletedAt'])
export class Staff extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl?: string;

  @Column({ length: 100 })
  position: string;

  @Column({ length: 20 })
  phone: string;

  @Column({
    type: 'enum',
    enum: StaffStatus,
    default: StaffStatus.ACTIVE,
  })
  status: StaffStatus;

  @Column({ name: 'date_added', type: 'date' })
  dateAdded: Date;
}
