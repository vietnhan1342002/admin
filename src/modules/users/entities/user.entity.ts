import { Entity, Column } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity()
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

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
