import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationExists = await this.specificationsRepository.findByName(name);

    if (specificationExists) {
      throw new Error(`Specification ${name} already exist`);
    }
    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
