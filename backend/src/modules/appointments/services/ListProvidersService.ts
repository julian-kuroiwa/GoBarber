import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Users from '@modules/users/infra/typeorm/entities/Users';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
    @inject('CacheProvider') private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequest): Promise<Users[]> {
    let users = await this.cacheProvider.recovery<Users[]>(
      `provider-list:${user_id}`
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });
    }

    await this.cacheProvider.save(
      `provider-list:${user_id}`,
      classToClass(users)
    );

    return users;
  }
}

export default ListProvidersService;
