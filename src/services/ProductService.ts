import { FindOptions, InferAttributes, Op, WhereOptions } from 'sequelize';
import { Product } from '../db/models/Product';
import {
  ProductCreationDto,
  ProductDto,
  ProductsDto,
} from '../view/ProductDto';

type SortId = 'priceAsc' | 'priceDesc' | 'abcAsc' | 'abcDesc';

export type QueryProducts = {
  categoryId?: number;
  sortId?: SortId;
  search?: string;
  page?: number;
  limit?: number;
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

  public static async getAllBy(
    query: QueryProducts = {}
  ): Promise<ProductsDto> {
    const products = await Product.findAndCountAll(
      this.queryToFindOptions(query)
    );
    return { products: products.rows, totalCount: products.count };
  }

  private static queryToWhereOptions(query: QueryProducts) {
    const { categoryId, search } = query;
    const whereOptions: WhereOptions<InferAttributes<Product>> = {};
    if (categoryId) {
      whereOptions.CategoryId = categoryId;
    }
    if (search) {
      whereOptions.title = {
        [Op.iLike]: `%${search}%`,
      };
    }

    return whereOptions;
  }

  private static queryToFindOptions(query: QueryProducts) {
    const { sortId, page, limit } = query;
    const findOptions: FindOptions<InferAttributes<Product>> = {
      where: this.queryToWhereOptions(query),
      limit: limit,
    };
    if (page && limit) {
      findOptions.offset = page ? page * limit : undefined;
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
