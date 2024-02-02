import express, { ErrorRequestHandler } from 'express';
import { connect } from './db/connect';
import { Product } from './db/models/Product';
import { Category } from './db/models/Category';
import { Order, Status } from './db/models/Order';
import { ProductController } from './controllers/ProductController';
import { CategoryController } from './controllers/CategoryController';
import { ProductDto } from './view/ProductDto';
import { json } from 'sequelize';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/api/products', ProductController.getProducts);

app.get('/api/categories', CategoryController.getCategories);

app.post('/api/products', ProductController.addProduct);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send({ message: err.message });
};

app.use(errorMiddleware);

app.listen(port, async () => {
  await connect();
});

/* const product = {
  title: 'bottle',
  imageUrl: 'https://ir-2.ozone.ru/s3/multimedia-4/wc1000/6757126564.jpg',
  price: 666,
  CategoryId: 1,
};

async () => {
  console.log(
    await fetch('http://localhost:3000/api/categories').then((r) => r.json())
  );
};

async () => {
  console.log(
    await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(product),
    }).then((r) => r.json())
  );
}; */
