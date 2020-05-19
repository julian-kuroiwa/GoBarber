import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokenRepository',
  UsersTokenRepository
);
