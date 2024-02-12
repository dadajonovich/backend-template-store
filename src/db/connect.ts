import { sequelize } from './sequelize';
import { Product } from './models/Product';
import { Category } from './models/Category';
import { Order } from './models/Order';
import { Relations } from './Relations';

export const connect = async () => {
  try {
    Relations.oneIn(Category, Product);
    Relations.manyToMany(Order, Product, '_OrderProduct');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // await sequelize.sync({ force: true });
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
