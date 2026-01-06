import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TypeOrmConfigModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT') || 3306,
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),

    autoLoadEntities: true,

    synchronize: false, // Không dùng synchronize khi production / migration
    migrationsRun: true,

    migrations: ['dist/database/migrations/*.js'],

    logging: config.get<string>('NODE_ENV') !== 'production',
  }),
});
