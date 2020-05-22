import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.put('/', ensureAuthenticated, profileController.update);
profileRouter.get('/', ensureAuthenticated, profileController.show);

export default profileRouter;
