import express from 'express';
import { connect } from './db/connect';
import { Product } from './db/Models/Product';
import { Category } from './db/Models/Category';
import { Order, Status } from './db/Models/Order';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connect();

  const [bottles, knives, plates] = await Category.bulkCreate([
    {
      title: 'Бутылки',
    },
    { title: 'Ножи' },
    { title: 'Тарелки' },
  ]);

  const products = await Product.bulkCreate([
    {
      title: 'Пепперони Фреш с перцем',
      imageUrl:
        'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
      price: 666,
      CategoryId: bottles.id,
    },
    {
      title: 'Сырная',
      imageUrl:
        'https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg',
      price: 888,
      CategoryId: knives.id,
    },
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
