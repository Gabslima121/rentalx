import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticatUserUseCase } from './authenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticatUserUseCase);

    const token = await authenticateUserUseCase.execute({ email, password });

    return response.json(token);
  }
}

export { AuthenticateUserController };
