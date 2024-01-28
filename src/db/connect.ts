import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('store_template', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
