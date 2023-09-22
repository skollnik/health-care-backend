import { Appointment } from 'src/domain/appointment/model/appointment';
import { DoctorSpecialty } from '../doctor-specialty.enum';
import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { User } from 'src/domain/auth/user';

export class Doctor {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly specialty: DoctorSpecialty,
    public readonly appointments: Appointment[] = [],
    public readonly medicalRecord: MedicalRecord[] = [],
    public readonly user: User = null,
  ) {}

  static create({
    id,
    userId,
    firstName,
    lastName,
    specialty,
    appointments = [],
    medicalRecord = [],
    user,
  }: Partial<Doctor>) {
    return new Doctor(
      id,
      userId,
      firstName,
      lastName,
      specialty,
      appointments,
      medicalRecord,
      user,
    );
  }
}
