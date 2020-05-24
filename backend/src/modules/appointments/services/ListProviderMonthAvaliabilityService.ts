import { getDaysInMonth, getDate } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  avaliable: boolean;
}>;

@injectable()
class ListProviderMonthAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      }
    );

    const numberOfdaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfdaysInMonth },
      (value, index) => index + 1
    );

    const avaliability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day
      );

      return {
        day,
        avaliable: appointmentsInDay.length < 10,
      };
    });

    return avaliability;
  }
}

export default ListProviderMonthAvaliabilityService;
