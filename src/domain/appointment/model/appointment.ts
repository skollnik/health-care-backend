import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { AppointmentStatus } from '../appointment-status.enum';
import { Doctor } from 'src/domain/specialization/model/doctor';
import { Patient } from 'src/domain/specialization/model/patient';
import { AggregateRoot } from '@nestjs/cqrs';

export class Appointment extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly doctorId: number,
    public readonly patientId: number,
    public readonly doctor: Doctor,
    public readonly patient: Patient,
    public readonly status: AppointmentStatus,
    public readonly medicalRecord?: Partial<MedicalRecord>,
  ) {
    super();
  }

  static create({
    id,
    doctorId,
    patientId,
    doctor,
    patient,
    status,
    medicalRecord,
  }: Partial<Appointment>) {
    return new Appointment(
      id,
      doctorId,
      patientId,
      doctor,
      patient,
      status,
      medicalRecord,
    );
  }
}
