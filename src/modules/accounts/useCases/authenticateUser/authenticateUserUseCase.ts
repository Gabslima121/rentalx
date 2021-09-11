import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepository } from '../../repositories/implementations/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}

@injectable()
class AuthenticatUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or Password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or Password incorrect!');
    }

    const token = sign({}, 'secret', {
      subject: user.id,
      expiresIn: '1d',
    });

    const returnToken: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return returnToken;
  }
}

export { AuthenticatUserUseCase };
