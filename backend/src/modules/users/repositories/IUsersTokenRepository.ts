import UserToken from '@modules/users/infra/typeorm/entities/UsersToken';

export default interface IUsersTokenRepository {
  generate(user_id: string): Promise<UserToken>;
}
