import { Category } from '../db/models/Category';
import { CategoryCreationDto, CategoryDto } from '../view/CategoryDto';

export class CategoryService {
  public static async getAll(): Promise<CategoryDto[]> {
    const categories = await Category.findAll();
    return categories.map(CategoryService.modelToDto);
  }

  public static modelToDto(category: Category): CategoryDto {
    const { id, title } = category;
    return { id, title };
  }
  public static async create(dto: CategoryCreationDto): Promise<CategoryDto> {
    const newCategory = await Category.create(dto);
    return CategoryService.modelToDto(newCategory);
  }
}
