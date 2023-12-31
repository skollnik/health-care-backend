import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';

export class CreateAppointmentCommand {
  constructor(
    public readonly doctorId: number,
    public readonly patientId: number,
    public readonly description: string,
    public readonly status: AppointmentStatus,
    public readonly date: Date,
  ) {}
}
