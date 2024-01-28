import express from 'express';
import { connect } from './db/connect';
import { Product } from './db/Product';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connect();
  await Product.create({ id: 1, title: 'name' });
  const test = await Product.findOne({ where: { id: 1 } });
  console.log(test?.toJSON());
});
