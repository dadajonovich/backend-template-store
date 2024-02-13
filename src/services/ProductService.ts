import { FindOptions, InferAttributes, Op, WhereOptions } from 'sequelize';
import { Product } from '../db/models/Product';
import { ProductCreationDto, ProductDto } from '../view/ProductDto';

type SortId = 'priceAsc' | 'priceDesc' | 'abcAsc' | 'abcDesc';

export type QueryProducts = {
  categoryId?: number;
  sortId?: SortId;
  search?: string;
  page?: number;
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

  public static async getAllBy(query: QueryProducts = {}) {
    const products = await Product.findAll(this.queryToFindOptions(query));
    return products;
  }

  private static queryToWhereOptions(query: QueryProducts) {
    const { categoryId, search } = query;
    const whereOptions: WhereOptions<InferAttributes<Product>> = {};
    if (categoryId) {
      whereOptions.CategoryId = categoryId;
    }
    if (search) {
      whereOptions.title = {
        [Op.substring]: search,
      };
    }

    return whereOptions;
  }

  private static queryToFindOptions(query: QueryProducts) {
    const { sortId, page } = query;
    const findOptions: FindOptions<InferAttributes<Product>> = {
      where: this.queryToWhereOptions(query),
      limit: 6,
    };
    if (page) {
      findOptions.offset = page ? (page - 1) * 6 : undefined;
    }

    if (sortId) {
      findOptions.order = [this.sortIdToOrder(sortId)];
    }

    return findOptions;
  }

  private static sortIdToOrder(sortId: SortId): [string, 'ASC' | 'DESC'] {
    switch (sortId) {
      case 'priceAsc':
        return ['price', 'ASC'];

      case 'priceDesc':
        return ['price', 'DESC'];

      case 'abcAsc':
        return ['title', 'ASC'];

      case 'abcDesc':
        return ['title', 'DESC'];

      default:
        throw new Error(sortId satisfies never);
    }
  }
}
