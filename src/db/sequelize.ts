import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('store_template', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});
