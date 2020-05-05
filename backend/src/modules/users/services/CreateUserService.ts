import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Users from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    const emailExists = await usersRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppError('E-mail already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
