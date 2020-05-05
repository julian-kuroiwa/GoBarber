import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../entities/Users';

import AppError from '../../../shared/errors/AppError';

import authconfig from '../../../config/authconfig';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class CreateAuthorizationService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({
      where: { email },
    });

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
