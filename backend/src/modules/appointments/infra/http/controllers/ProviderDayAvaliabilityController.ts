import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProviderDayAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, day, year } = request.body;
    const { provider_id } = request.params;

    const listProviderDayAvaliability = container.resolve(
      ListProviderDayAvaliabilityService
    );

    const appointment = await listProviderDayAvaliability.execute({
      month,
      day,
      year,
      provider_id,
    });

    return response.json(appointment);
  }
}
