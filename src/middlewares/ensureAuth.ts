import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload{
  sub: string;
}

export async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'secret') as IPayload;

    const usersRepository = new UsersRepository();

    const userExists = await usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error('User not found!');
    }

    next();
  } catch (error) {
    throw new Error('Invalid Token!');
  }
}