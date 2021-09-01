/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */

import { CategoryModel } from '../../model/CategoryModel';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): CategoryModel[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
