import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { Doctor } from 'src/domain/specialization/model/doctor';
import { Patient } from 'src/domain/specialization/model/patient';

export class AppointmentPresenter {
  public readonly id: number;
  public readonly doctor: Doctor;
  public readonly patient: Patient;
  public readonly description: string;
  public readonly status: AppointmentStatus;
  public readonly date: Date;
  constructor({ id, doctor, patient, description, status, date }: Appointment) {
    this.id = id;
    this.doctor = doctor;
    this.patient = patient;
    this.description = description;
    this.status = status;
    this.date = date;
  }
}
