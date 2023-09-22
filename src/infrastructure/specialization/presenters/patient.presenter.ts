import { Gender } from '@prisma/client';
import { Patient } from 'src/domain/specialization/model/patient';

export class PatientPresenter {
  private readonly id: number;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly gender: Gender;
  constructor({ id, firstName, lastName, gender }: Patient) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
  }
}
