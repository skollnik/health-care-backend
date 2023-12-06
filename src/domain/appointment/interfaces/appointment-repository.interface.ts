import { Appointment } from '../model/appointment';

export interface IAppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  findById(appointmentId: number): Promise<Appointment>;
  findAll(): Promise<Appointment[]>;
  findAllByDoctorId(doctorId: number): Promise<Appointment[]>;
  findAllByPatientId(patientId: number): Promise<Appointment[]>;
  update(appointment: Appointment): Promise<Appointment>;
  delete(appointmentId: number): Promise<void>;
}
