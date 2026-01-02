import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class EmailVerificationToken extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ unique: true })
  token: string;

  @Column({ name: 'expired_at', type: 'timestamp' })
  expiredAt: Date;

  @Column({ name: 'used_at', type: 'timestamp', nullable: true })
  usedAt: Date | null;
}
