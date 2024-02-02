import { Product } from '../db/models/Product';
import { ProductCreationDto, ProductDto } from '../view/ProductDto';

export class ProductService {
  public static modelToDto(product: Product): ProductDto {
    const { id, title, imageUrl, price, CategoryId } = product;
    return { id, title, imageUrl, price, CategoryId };
  }

  public static async createProduct(dto: ProductCreationDto) {
    const newProduct = await Product.create(dto);
    return newProduct;
  }
}
