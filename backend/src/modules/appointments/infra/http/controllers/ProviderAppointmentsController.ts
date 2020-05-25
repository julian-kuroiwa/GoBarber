import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderDayAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, day, year } = request.body;
    const { provider_id } = request.params;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointments.execute({
      month,
      day,
      year,
      provider_id,
    });

    return response.json(appointments);
  }
}
