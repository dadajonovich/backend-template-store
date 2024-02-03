import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ProductService } from '../services/ProductService';
import { ProductCreationDto, ProductDto } from '../view/ProductDto';

export class ProductController {
  public static getAll: RequestHandler<
    ParamsDictionary,
    ProductDto[],
    void,
    { category: string }
  > = async (req, res, next) => {
    try {
      if (req.query.category) {
        const categoryId = req.query.category;
        const products = await ProductService.getAllByCategoryId(
          Number(categoryId)
        );
        res.status(200).send(products);
        return;
      }

      const products = await ProductService.getAll();
      res.status(200).send(products);
    } catch (error) {
      next(error);
    }
  };

  public static add: RequestHandler<void, ProductDto, ProductCreationDto> =
    async (req, res, next) => {
      try {
        const { title, imageUrl, price, CategoryId } = req.body;
        const newProduct = await ProductService.create({
          title: title.trim(),
          imageUrl,
          price,
          CategoryId,
        });

        res.status(200).send(ProductService.modelToDto(newProduct));
      } catch (error) {
        next(error);
      }
    };
}
