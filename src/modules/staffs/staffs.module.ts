import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { Staff } from './entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRepository } from './repositories/staff.repository';
import { StaffMapper } from './mapper/staff.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Staff])],
  controllers: [StaffsController],
  providers: [StaffsService, StaffRepository, StaffMapper],
  exports: [StaffsService, StaffRepository],
})
export class StaffsModule {}
