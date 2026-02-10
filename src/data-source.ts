import 'dotenv/config';
import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'mysql',

  host: process.env.MYSQL_HOST || process.env.DB_HOST,
  port: Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
  username: process.env.MYSQL_USER || process.env.DB_USER,
  password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'production'
      ? process.env.MYSQL_DATABASE || process.env.DB_NAME
      : process.env.DB_NAME_DEV,

  entities: isProd
    ? ['dist/modules/**/entities/*.entity.js']
    : ['src/modules/**/entities/*.entity.ts'],

  migrations: isProd
    ? ['dist/database/migrations/*.js']
    : ['src/database/migrations/*.ts'],

  synchronize: false,
});
