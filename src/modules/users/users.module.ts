import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';
import { UserMapper } from './mapper/user.mapper';
import { StaffsModule } from '../staffs/staffs.module';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), StaffsModule, DoctorsModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserMapper],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
