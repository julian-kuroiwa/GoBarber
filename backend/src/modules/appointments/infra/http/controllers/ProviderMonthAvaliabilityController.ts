import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvaliabilityService from '@modules/appointments/services/ListProviderMonthAvaliabilityService';

export default class ProviderMonthAvaliabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;
    const { provider_id } = request.params;

    const listProviderMonthAvaliability = container.resolve(
      ListProviderMonthAvaliabilityService
    );

    const appointment = await listProviderMonthAvaliability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(appointment);
  }
}
