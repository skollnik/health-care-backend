import { Appointment } from 'src/domain/appointment/model/appointment';
import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { Gender } from '../gender.enum';
import { User } from 'src/domain/auth/user';

export class Patient {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly gender: Gender,
    public readonly appointments: Appointment[],
    public readonly medicalRecord: MedicalRecord[],
    public readonly user: User = null,
  ) {}

  static create({
    id,
    userId,
    firstName,
    lastName,
    gender,
    appointments = [],
    medicalRecord = [],
    user,
  }: Partial<Patient>) {
    return new Patient(
      id,
      userId,
      firstName,
      lastName,
      gender,
      appointments,
      medicalRecord,
      user,
    );
  }
}
