import express from 'express';
import { connect } from './db/connect';
import { Product } from './db/Product';
import { Category } from './db/Category';

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

  const product = await Product.create({
    title: 'Пепперони Фреш с перцем',
    imageUrl:
      'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
    price: 666,
    CategoryId: bottles.id,
  });

  const test = await Product.findOne({ where: { id: 1 }, include: [Category] });
  console.log(test?.toJSON());
});
