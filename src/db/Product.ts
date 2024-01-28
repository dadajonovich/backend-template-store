import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { sequelize } from './sequelize';
import { Category } from './Category';

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare imageUrl: string;
  declare title: string;
  declare price: number;

  declare CategoryId: ForeignKey<Category['id']>;
  declare Category?: NonAttribute<Category>;
  declare createCategory: BelongsToCreateAssociationMixin<Category>;
  declare setCategory: BelongsToSetAssociationMixin<Category, Category['id']>;
  declare getCategory: BelongsToGetAssociationMixin<Category>;
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
