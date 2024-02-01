import express, { ErrorRequestHandler } from 'express';
import { connect } from './db/connect';
import { Product } from './db/Models/Product';
import { Category } from './db/Models/Category';
import { Order, Status } from './db/Models/Order';
import { ProductController } from './controllers/ProductController';
import { CategoryController } from './controllers/CategoryController';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/products', ProductController.getProducts);

app.get('/api/categories', CategoryController.getCategories);

app.post('/api/products', ProductController.addProduct);

const errorMiddleware: ErrorRequestHandler = (err, req, res, _) => {
  res.status(500);
  res.send({ message: err.message });
};

app.use(errorMiddleware);

app.listen(port, async () => {
  await connect();

  const [bottles, knives, plates] = await Category.bulkCreate([
    {
      title: 'Бутылки',
    },
    { title: 'Ножи' },
    { title: 'Тарелки' },
  ]);

  const order = await Order.create({
    adress: 'Moscow',
    name: 'Alex',
    phone: '88005553535',
    status: Status.pending,
  });

  await order.addProducts(products);

  const consoleProduct = await Product.findOne({
    where: { id: 1 },
    include: [Category],
  });
  console.log(consoleProduct?.toJSON());

  const consoleOrder = await Order.findOne({
    include: [Product],
  });

  const sum = consoleOrder?.Products?.reduce(
    (acc, product) => (acc += product.price),
    0
  );
  console.log(sum);

  console.log(consoleOrder?.toJSON());
});
