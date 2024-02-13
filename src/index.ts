import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { connect } from './db/connect';
import { ProductController } from './controllers/ProductController';
import { CategoryController } from './controllers/CategoryController';

const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/api/products?', ProductController.getAll);

app.get('/api/categories', CategoryController.getAll);

app.post('/api/products', ProductController.add);

app.post('/api/categories', CategoryController.add);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: err.message });
};

app.use(errorMiddleware);

app.listen(port, async () => {
  await connect();
});

/* 

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

// const categories = ['Бутылки', 'Посуда', 'Разное'];

// const addCategoryInDb = async (category) => {
//   console.log(
//     await fetch('http://localhost:3000/api/categories', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify({ title: category }),
//     }).then((r) => r.json())
//   );
// };

// const addDb = async (item) => {
//   console.log(
//     await fetch('http://localhost:3000/api/products', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify({
//         title: item.title,
//         description: item.description,
//         imageUrl: item.thumbnail,
//         price: item.price,
//         CategoryId: Math.floor(Math.random() * 3 + 1),
//       }),
//     }).then((r) => r.json())
//   );
// };
