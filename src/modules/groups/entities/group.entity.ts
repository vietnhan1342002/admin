import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { Department } from 'src/modules/departments/entities/department.entity';

@Entity('groups')
@Index('unique_group_name_not_deleted', ['name'], {
  unique: true,
  where: `"deletedAt" IS NULL`,
})
export class Group extends BaseEntity {
  @Index({ unique: true })
  @Column()
  value: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => Department, (department) => department.group)
  departments: Department[];
}
