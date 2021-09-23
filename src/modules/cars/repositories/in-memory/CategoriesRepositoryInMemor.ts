import { CategoryModel } from '../../entities/CategoryModel';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: CategoryModel[] = [];

  async findByName(name: string): Promise<CategoryModel> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async list(): Promise<CategoryModel[]> {
    const listAll = this.categories;

    return listAll;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new CategoryModel();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
