import { RequestHandler } from 'express';
import { CategoryCreationDto, CategoryDto } from '../view/CategoryDto';
import { CategoryService } from '../services/CategoryService';

export class CategoryController {
  public static add: RequestHandler<void, CategoryCreationDto, CategoryDto> =
    async (req, res, next) => {
      try {
        const { title } = req.body;
        const newCategory = await CategoryService.create({
          title: title.trim(),
        });
        res.status(200).send(newCategory);
      } catch (error) {
        next(error);
      }
    };

  public static getAll: RequestHandler<void, CategoryDto[]> = async (
    req,
    res
  ) => {
    const categories = await CategoryService.getAll();
    // categories.map((cat) => console.log(cat.toJSON()));
    res.status(200).send(categories);
  };
}
