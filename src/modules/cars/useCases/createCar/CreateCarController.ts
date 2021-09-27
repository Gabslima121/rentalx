import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      category_id,
      name,
      license_plate,
      fine_amount,
      description,
      daily_rate,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      category_id,
      name,
      license_plate,
      fine_amount,
      description,
      daily_rate,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
