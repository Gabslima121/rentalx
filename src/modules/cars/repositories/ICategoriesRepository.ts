/* eslint-disable import/prefer-default-export */
import { CategoryModel } from '../model/CategoryModel';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): CategoryModel;

  list(): CategoryModel[];

  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
