import { Appointment } from 'src/domain/appointment/model/appointment';

export class AppointmentCreatedPayload {
  constructor(
    public readonly id: number,
    public readonly appointment: Appointment,
  ) {}
}
