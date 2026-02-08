import 'dotenv/config';
import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'mysql',

  host: process.env.DB_HOST || process.env.MYSQL_HOST,
  port: Number(process.env.DB_PORT || process.env.MYSQL_PORT || 3306),
  username: process.env.DB_USER || process.env.MYSQL_USER,
  password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD,
  database: isProd
    ? process.env.DB_NAME || process.env.MYSQL_DATABASE
    : process.env.DB_NAME_DEV,

  entities: isProd
    ? ['dist/modules/**/entities/*.entity.js']
    : ['src/modules/**/entities/*.entity.ts'],

  migrations: isProd
    ? ['dist/database/migrations/*.js']
    : ['src/database/migrations/*.ts'],

  synchronize: false,
});
