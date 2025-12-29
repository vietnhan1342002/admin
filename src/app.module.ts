import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './shared/redis/redis.module';
import { TypeOrmConfigModule } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guard/jwt-auth.guard';
import { RolesGuard } from './common/guard/roles.guard';
import { BannerModule } from './modules/banner/banner.module';
import { StaffsModule } from './modules/staffs/staffs.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
// import { typeormConfig } from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    UsersModule,
    AuthModule,
    TypeOrmConfigModule,
    RedisModule,
    BannerModule,
    StaffsModule,
    DoctorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
