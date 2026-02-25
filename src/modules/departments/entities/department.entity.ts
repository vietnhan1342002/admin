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
  block: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ name: 'group_id', nullable: true })
  groupId: string | null;

  @ManyToOne(() => Group, (group) => group.departments, {
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'group_id' })
  group: Group | null;

  @OneToMany(() => Specialty, (specialty) => specialty.department)
  specialties: Specialty[];
}
