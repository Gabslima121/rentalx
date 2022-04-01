import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car 1',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 100,
      brand: 'Brand 1',
      category_id: 'category-id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car 2',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 100,
      brand: 'Brand_test',
      category_id: 'category-id',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Brand_test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_test',
      description: 'Car 2',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 100,
      brand: 'Brand 2',
      category_id: 'category-id',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Car_test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_test',
      description: 'Car 2',
      daily_rate: 100,
      license_plate: 'TST-1234',
      fine_amount: 100,
      brand: 'Brand 2',
      category_id: '12345',
    });

    const cars = await listCarsUseCase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
