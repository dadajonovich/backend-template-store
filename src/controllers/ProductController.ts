import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Category } from '../db/models/Category';
import { Product } from '../db/models/Product';
import { ProductService } from '../services/ProductService';
import { ProductCreationDto, ProductDto } from '../view/ProductDto';

export class ProductController {
  public static async getProducts(
    req: Request<ParamsDictionary, ProductDto[], void, { category: string }>,
    res: Response<ProductDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      if (typeof req.query.category === 'string' && req.query.category) {
        const categoryId = req.query.category;

        const category = await Category.findByPk(categoryId);
        if (category === null) throw new Error('Category not found!');
        const products = await category.getProducts();
        res.status(200).send(products.map(ProductService.modelToDto));
        return;
      }

      const products = await Product.findAll();
      res.status(200).send(products.map(ProductService.modelToDto));
    } catch (error) {
      next(error);
    }
  }

  public static async addProduct(
    req: Request<ParamsDictionary, ProductDto, ProductCreationDto>,
    res: Response<ProductDto>
  ): Promise<void> {
    const { title, imageUrl, price, CategoryId } = req.body;
    const newProduct = await Product.create({
      title: title.trim(),
      imageUrl,
      price,
      CategoryId,
    });

    res.status(200).send(ProductService.modelToDto(newProduct));
  }
}
