// src/modules/departments/entities/department.entity.ts
import { Entity, Column, Index, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { Specialty } from 'src/modules/specialties/entities/specialty.entity';

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

  @OneToMany(() => Specialty, (specialty) => specialty.department)
  specialties: Specialty[];
}
