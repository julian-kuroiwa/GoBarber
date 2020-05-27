import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateAuthorizationService from './CreateAuthorizationService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticatedUser: CreateAuthorizationService;

describe('CreateAuthorizationService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticatedUser = new CreateAuthorizationService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticated', async () => {
    const user = await fakeUsersRepository.create({
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
    expect(
      authenticatedUser.execute({
        email: 'john.doe@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticated with the wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '123456',
    });

    await expect(
      authenticatedUser.execute({
        email: 'john.doe@test.com',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
