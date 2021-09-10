/* eslint-disable import/prefer-default-export */
import { CategoryModel } from '../entities/CategoryModel';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<CategoryModel>;

  list(): Promise<CategoryModel[]>;

  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
