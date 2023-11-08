import { Appointment } from 'src/domain/appointment/model/appointment';

export class AppointmentCreatedPresenter {
  public readonly id: number;
  public readonly doctorId: number;
  public readonly patientId: number;
  public readonly date: Date;
  constructor({ id, doctorId, patientId, date }: Appointment) {
    this.id = id;
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.date = date;
  }
}
