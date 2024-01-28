import { sequelize } from './sequelize';
import { Product } from './Models/Product';
import { Category } from './Models/Category';
import { Order } from './Models/Order';
import { Relations } from './Relations';

export const connect = async () => {
  try {
    // Product.belongsTo(Category);
    // Category.hasMany(Product);

    Relations.oneIn(Category, Product);
    Relations.manyToMany(Order, Product, '_OrderProduct');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
