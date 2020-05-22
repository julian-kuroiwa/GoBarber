import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRoute = Router();
providersRoute.use(ensureAuthenticated);

const providersController = new ProvidersController();

providersRoute.get('/', providersController.index);

export default providersRoute;
