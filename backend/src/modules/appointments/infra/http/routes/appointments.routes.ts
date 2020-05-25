import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

const appointmentController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.post('/', appointmentController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
