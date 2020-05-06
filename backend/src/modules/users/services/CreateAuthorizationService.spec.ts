import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateAuthorizationService from './CreateAuthorizationService';
import CreateUserService from './CreateUserService';

describe('CreateAuthorizationService', () => {
  it('should be able to authenticated', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticatedUser = new CreateAuthorizationService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '123456',
    });

    const response = await authenticatedUser.execute({
      email: 'john.doe@test.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticated an inexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticatedUser = new CreateAuthorizationService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticatedUser.execute({
        email: 'john.doe@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticated with the wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticatedUser = new CreateAuthorizationService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '123456',
    });

    expect(
      authenticatedUser.execute({
        email: 'john.doe@test.com',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
