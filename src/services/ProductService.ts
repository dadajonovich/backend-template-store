import { Category } from '../db/models/Category';
import { Product } from '../db/models/Product';
import { ProductCreationDto, ProductDto } from '../view/ProductDto';

type SortId = 'sortBy' | 'priceAsc' | 'priceDesc' | 'abcAsc' | 'abcDesc';

export type QueryProducts = {
  categoryId?: number;
  sortId?: SortId;
};

export class ProductService {
  public static async getAll(): Promise<ProductDto[]> {
    const products = await Product.findAll();
    return products.map(ProductService.modelToDto);
  }

  public static modelToDto(product: Product): ProductDto {
    const { id, title, description, imageUrl, price, CategoryId } = product;
    return { id, title, description, imageUrl, price, CategoryId };
  }

  public static async create(dto: ProductCreationDto) {
    const newProduct = await Product.create(dto);
    return newProduct;
  }

  public static async getAllBy(query: QueryProducts) {
    const { categoryId, sortId } = query;
    if (categoryId && !sortId) {
      const category = await Category.findByPk(categoryId);
      if (category === null) throw new Error('Category not found!');
      const products = await category.getProducts();
      return products.map(ProductService.modelToDto);
    }
    if (!categoryId && sortId) {
      switch (sortId) {
        case 'sortBy':
          break;

        case 'priceAsc':
          break;

        case 'priceDesc':
          break;

        case 'abcAsc':
          break;

        case 'abcDesc':
          break;

        default:
          break;
      }
    }
  }
}
