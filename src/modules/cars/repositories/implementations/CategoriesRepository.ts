import { CategoryModel } from '../../entities/CategoryModel';
import {
  ICreateCategoryDTO,
  ICategoriesRepository,
} from '../ICategoriesRepository';

import { getRepository, Repository } from 'typeorm';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<CategoryModel>;

  constructor() {
    this.repository = getRepository(CategoryModel);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<CategoryModel[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<CategoryModel> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
