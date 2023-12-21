import { Appointment } from 'src/domain/appointment/model/appointment';

export class AppointmentCreatedEvent {
  constructor(
    public readonly appointment: Appointment,
    public readonly doctorId: number,
  ) {}
}
