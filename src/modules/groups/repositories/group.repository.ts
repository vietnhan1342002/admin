import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Group } from '../entities/group.entity';

@Injectable()
export class GroupRepository extends BaseRepository<Group> {
  constructor(
    @InjectRepository(Group) repo: Repository<Group>,
    private readonly dataSource: DataSource,
  ) {
    super(repo, Group, dataSource.createEntityManager());
  }

  async findTree(): Promise<Group[]> {
    return this.repo
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.departments', 'department')
      .leftJoinAndSelect('department.specialties', 'specialty')
      .orderBy({
        'group.name': 'ASC',
        'department.name': 'ASC',
        'specialty.name': 'ASC',
      })
      .getMany();
  }
}
