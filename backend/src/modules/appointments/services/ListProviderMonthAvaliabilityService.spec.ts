import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';

let listProvidersMonthAvaliability: ListProviderMonthAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvaliability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvaliability = new ListProviderMonthAvaliabilityService(
      fakeAppointmentsRepository
    );
  });
  it('should be able to list the month avaliability for provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const avaliability = await listProvidersMonthAvaliability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        {
          day: 19,
          avaliable: true,
        },
        {
          day: 20,
          avaliable: false,
        },
        {
          day: 21,
          avaliable: false,
        },
        {
          day: 22,
          avaliable: true,
        },
      ])
    );
  });
});
