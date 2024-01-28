import { DataTypes, Model } from 'sequelize';
import { sequelize } from './connect';

export class Product extends Model {
  declare id: number;
  declare imageUrl: string;
  declare title: string;
  declare price: number;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  { sequelize, timestamps: false }
);
