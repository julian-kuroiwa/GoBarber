import { uuid } from 'uuidv4';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';

import UsersToken from '@modules/users/infra/typeorm/entities/UsersToken';

class FakesUsersTokenRepository implements IUsersTokenRepository {
  private usersToken: UsersToken[] = [];

  public async generate(user_id: string): Promise<UsersToken> {
    const userToken = new UsersToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.usersToken.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UsersToken | undefined> {
    const usersToken = this.usersToken.find(
      findToken => findToken.token === token
    );

    return usersToken;
  }
}

export default FakesUsersTokenRepository;
