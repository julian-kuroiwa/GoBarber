import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAuthorizationService from '@modules/users/services/CreateAuthorizationService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createAuthorization = container.resolve(CreateAuthorizationService);

    const { user, token } = await createAuthorization.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
