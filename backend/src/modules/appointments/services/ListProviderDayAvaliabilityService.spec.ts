import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaliabilityService from './ListProviderDayAvaliabilityService';

let listProvidersDayAvaliability: ListProviderDayAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvaliability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvaliability = new ListProviderDayAvaliabilityService(
      fakeAppointmentsRepository
    );
  });
  it('should be able to list the day avaliability for provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const avaliability = await listProvidersDayAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          avaliable: false,
        },
        {
          hour: 9,
          avaliable: true,
        },
        {
          hour: 10,
          avaliable: false,
        },
        {
          hour: 11,
          avaliable: true,
        },
      ])
    );
  });
});
