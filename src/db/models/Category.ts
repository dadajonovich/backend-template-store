import {
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { sequelize } from '../sequelize';
import { Product } from './Product';

export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>;
  declare title: string;

  declare Products?: NonAttribute<Product[]>;
  declare addProducts: HasManyAddAssociationsMixin<Product, Product['id']>;
  declare setProducts: HasManySetAssociationsMixin<Product, Product['id']>;
  declare hasProducts: HasManyHasAssociationsMixin<Product, Product['id']>;
  declare getProducts: HasManyGetAssociationsMixin<Product>;
  declare removeProducts: HasManyRemoveAssociationsMixin<
    Product,
    Product['id']
  >;
  declare countProducts: HasManyCountAssociationsMixin;
  declare createProduct: HasManyCreateAssociationMixin<Product, 'id'>;
  declare addProduct: HasManyAddAssociationMixin<Product, Product['id']>;
  declare hasProduct: HasManyHasAssociationMixin<Product, Product['id']>;
  declare removeProduct: HasManyRemoveAssociationMixin<Product, Product['id']>;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
);
