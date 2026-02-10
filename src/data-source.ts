import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'mysql',

  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT || 3306),
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database:
    process.env.NODE_ENV === 'production' ? process.env.MYSQLDATABASE : 'admin',

  entities: isProd
    ? ['dist/modules/**/entities/*.entity.js']
    : ['src/modules/**/entities/*.entity.ts'],

  migrations: isProd
    ? ['dist/database/migrations/*.js']
    : ['src/database/migrations/*.ts'],

  synchronize: false,
});
