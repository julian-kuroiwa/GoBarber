import Appointment from '@modules/appointments/infra/typorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
