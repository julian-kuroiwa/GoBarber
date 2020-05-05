import { Router } from 'express';
import CreateAuthorizationService from '../../../../modules/users/services/CreateAuthorizationService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createAuthorization = new CreateAuthorizationService();

  const { user, token } = await createAuthorization.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
