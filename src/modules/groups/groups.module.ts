import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupMapper } from './mapper/group.mapper';
import { GroupRepository } from './repositories/group.repository';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService, GroupRepository, GroupMapper],
  exports: [GroupsService, GroupRepository],
})
export class GroupsModule {}
