import { Appointment } from 'src/domain/appointment/model/appointment';

export class AppointmentCreatedPresenter {
  public readonly id: number;
  public readonly doctorId: number;
  public readonly patientId: number;
  constructor({ id, doctorId, patientId }: Appointment) {
    this.id = id;
    this.doctorId = doctorId;
    this.patientId = patientId;
  }
}
