import { Entity, Column, Index } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('users')
@Index('IDX_users_name_deleted_at', ['name', 'deletedAt'])
@Index('UQ_users_email_deleted_at', ['email', 'deletedAt'], { unique: true })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'is_verify_email', type: 'boolean' })
  isVerifyEmail: boolean;

  @Column({ length: 20 })
  phone: string;
}
