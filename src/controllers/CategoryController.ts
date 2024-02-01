import { Request, Response } from 'express';
import { Category } from '../db/models/Category';

export class CategoryController {
  public static async getCategories(
    req: Request,
    res: Response
  ): Promise<void> {
    const categories = await Category.findAll();
    // categories.map((cat) => console.log(cat.toJSON()));
    res.send(categories);
  }
}
