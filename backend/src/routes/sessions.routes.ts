import { Router } from 'express';
import CreateAuthorizationService from '../services/CreateAuthorizationService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createAuthorization = new CreateAuthorizationService();

    const { user, token } = await createAuthorization.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
