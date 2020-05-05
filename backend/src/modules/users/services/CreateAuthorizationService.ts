import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';

import authconfig from '@config/authconfig';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

class CreateAuthorizationService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail or password incorrect', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('E-mail or password incorrect', 401);
    }

    const { secret, expiresIn } = authconfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateAuthorizationService;
