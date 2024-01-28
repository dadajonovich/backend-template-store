import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import { sequelize } from '../sequelize';
import { Category } from './Category';
import { Order } from './Order';

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

  declare Orders?: NonAttribute<Order[]>;
  declare addOrders: BelongsToManyAddAssociationsMixin<Order, Order['id']>;
  declare setOrders: BelongsToManySetAssociationsMixin<Order, Order['id']>;
  declare hasOrders: BelongsToManyHasAssociationsMixin<Order, Order['id']>;
  declare getOrders: BelongsToManyGetAssociationsMixin<Order>;
  declare removeOrders: BelongsToManyRemoveAssociationsMixin<
    Order,
    Order['id']
  >;
  declare countOrders: BelongsToManyCountAssociationsMixin;
  declare createOrder: BelongsToManyCreateAssociationMixin<Order>;
  declare addOrder: BelongsToManyAddAssociationMixin<Order, Order['id']>;
  declare hasOrder: BelongsToManyHasAssociationMixin<Order, Order['id']>;
  declare removeOrder: BelongsToManyRemoveAssociationMixin<Order, Order['id']>;
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
