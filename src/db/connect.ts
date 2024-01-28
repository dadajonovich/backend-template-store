import { sequelize } from './sequelize';
import { Product } from './Product';
import { Category } from './Category';

export const connect = async () => {
  try {
    Product.belongsTo(Category);
    Category.hasMany(Product);
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
