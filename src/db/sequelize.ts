import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
  process.env.DB_DATABASENAME!,
  process.env.DB_LOGIN!,
  process.env.DB_PASSWORD!,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);
