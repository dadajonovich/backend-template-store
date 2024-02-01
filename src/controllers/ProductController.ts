import { NextFunction, Request, Response } from 'express';
import { Category } from '../db/Models/Category';
import { Product } from '../db/Models/Product';

type ProductDto = {
  title: string;
  imageUrl: string;
  price: number;
};

export class ProductController {
  public static async getProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (typeof req.query.category === 'string' && req.query.category) {
        const categoryId = req.query.category;
        const categoryIdOne = await Category.findByPk(categoryId);
        res.send(await categoryIdOne?.getProducts());
        return;
      }

      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      next(error);
    }
  }

  public static async addProduct(
    req: Request<{}, any, ProductDto>,
    res: Response
  ): Promise<void> {
    const products = await Product.create({
      title: 'Пепперони Фреш с перцем',
      imageUrl:
        'https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg',
      price: 666,
    });

    const body = req.body;
  }
}
