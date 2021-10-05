import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';

let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('Should not be able to add a new specification to a non-existing car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specification_id = ['32143'];

      await createCarSpecificationsUseCase.execute({
        car_id,
        specification_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to add a new specification to an existing car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'test',
    });

    const specification_id = [specification.id];

    const specsCar = await createCarSpecificationsUseCase.execute({
      car_id: car.id,
      specification_id,
    });

    expect(specsCar).toHaveProperty('specifications');
    expect(specsCar.specifications.length).toBe(1);
  });
});
