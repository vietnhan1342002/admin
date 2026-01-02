import { Entity, Column, Index } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity()
@Index(['firstName', 'deletedAt'])
@Index(['lastName', 'deletedAt'])
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

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'is_verify_email', type: 'boolean' })
  isVerifyEmail: boolean;

  @Column({ length: 20 })
  phone: string;
}
