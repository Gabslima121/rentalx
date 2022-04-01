import dayjs from 'dayjs';

import { AppError } from '@errors/AppError';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { DayJsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe('Create Rental', () => {
  const addDay = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    dayJsDateProvider = new DayJsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    );
  });

  it('should be able to create a rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '12345',
      expected_return_date: addDay,
      user_id: '12345',
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another rental open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '12345',
        expected_return_date: addDay,
        user_id: '12345',
      });

      await createRentalUseCase.execute({
        car_id: '12345',
        expected_return_date: addDay,
        user_id: '12345',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another rental open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: addDay,
        user_id: '123',
      });

      await createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: addDay,
        user_id: '321',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return date', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: dayjs().toDate(),
        user_id: '123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
