import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';

class CreateCarSpecificatonsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationsUseCase
    );

    const carsSpecs = await createCarSpecificationUseCase.execute({
      car_id: id,
      specification_id,
    });

    // console.log(carsSpecs);

    return response.json(carsSpecs);
  }
}

export { CreateCarSpecificatonsController };
