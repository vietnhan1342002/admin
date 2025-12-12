/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './shared/redis/redis.module';
import { TypeOrmConfigModule } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guard/jwt-auth.guard';
import { RolesGuard } from './common/guard/roles.guard';
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
    PostsModule,
    AuthModule,
    TypeOrmConfigModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // chạy trước -> gán req.user
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // chạy sau -> check role
    },
  ],
})
export class AppModule {}
