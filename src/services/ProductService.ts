import { Category } from '../db/models/Category';
import { Product } from '../db/models/Product';
import { ProductCreationDto, ProductDto } from '../view/ProductDto';

export class ProductService {
  public static async getAll(): Promise<ProductDto[]> {
    const products = await Product.findAll();
    return products.map(ProductService.modelToDto);
  }

  public static modelToDto(product: Product): ProductDto {
    const { id, title, imageUrl, price, CategoryId } = product;
    return { id, title, imageUrl, price, CategoryId };
  }

  public static async create(dto: ProductCreationDto) {
    const newProduct = await Product.create(dto);
    return newProduct;
  }

  public static async getAllByCategoryId(id: number) {
    const category = await Category.findByPk(id);
    if (category === null) throw new Error('Category not found!');
    const products = await category.getProducts();
    return products.map(ProductService.modelToDto);
  }
}
