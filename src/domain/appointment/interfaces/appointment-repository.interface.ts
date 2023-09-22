import { Appointment } from '../model/appointment';

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
}
