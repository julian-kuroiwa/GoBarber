import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.usersTokenRepository.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`
    );
  }
}

export default SendForgotPasswordEmailService;
