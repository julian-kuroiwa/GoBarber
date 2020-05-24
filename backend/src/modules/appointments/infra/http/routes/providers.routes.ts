import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvaliabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvaliabilityController';
import ProviderMonthAvaliabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvaliabilityController';

const providersRoute = Router();
providersRoute.use(ensureAuthenticated);

const providersController = new ProvidersController();
const providerDayAvaliabilityController = new ProviderDayAvaliabilityController();
const providerMonthAvaliabilityController = new ProviderMonthAvaliabilityController();

providersRoute.get('/', providersController.index);
providersRoute.get(
  '/:id/day-avaliability',
  providerDayAvaliabilityController.index
);
providersRoute.get(
  '/:id/month-avaliability',
  providerMonthAvaliabilityController.index
);

export default providersRoute;
