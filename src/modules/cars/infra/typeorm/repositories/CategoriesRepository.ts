import { getRepository, Repository } from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';
import { CategoryModel } from '../entities/CategoryModel';


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
