import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';
import { UserMapper } from './mapper/user.mapper';
import { StaffsModule } from '../staffs/staffs.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { EmailRepository } from './repositories/email.repository';
import { EmailVerificationToken } from './entities/email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([EmailVerificationToken]),
    StaffsModule,
    DoctorsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserMapper, EmailRepository],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
