import { DoctorSpecialty } from 'src/domain/specialization/doctor-specialty.enum';
import { Doctor } from 'src/domain/specialization/model/doctor';

export class DoctorPresenter {
  private readonly id: number;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly specialty: DoctorSpecialty;
  constructor({ id, firstName, lastName, specialty }: Doctor) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialty = specialty;
  }
}
