import { Product } from '../db/models/Product';
import { ProductDto } from '../view/ProductDto';

export class ProductService {
  public static modelToDto(product: Product): ProductDto {
    const { id, title, imageUrl, price, CategoryId } = product;
    return { id, title, imageUrl, price, CategoryId };
  }
}
