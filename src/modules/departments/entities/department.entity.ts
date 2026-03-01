// src/modules/departments/entities/department.entity.ts
import {
  Entity,
  Column,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { Specialty } from 'src/modules/specialties/entities/specialty.entity';
import { Group } from 'src/modules/groups/entities/group.entity';

@Entity('departments')
@Index('unique_name_not_deleted', ['name'], {
  unique: true,
  where: `"deletedAt" IS NULL`,
})
export class Department extends BaseEntity {
  @Index({ unique: true })
  @Column()
  value: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToOne(() => Group, (group) => group.departments, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ name: 'group_id' })
  groupId: string;

  @OneToMany(() => Specialty, (specialty) => specialty.department)
  specialties: Specialty[];
}
