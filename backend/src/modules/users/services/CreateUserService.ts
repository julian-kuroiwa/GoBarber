import { injectable, inject } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('CacheProvider') private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<Users> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('provider-list');

    return user;
  }
}

export default CreateUserService;
