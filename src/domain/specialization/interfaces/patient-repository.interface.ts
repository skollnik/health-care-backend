import { Patient } from '../model/patient';

export interface IPatientRepository {
  findById(id: number): Promise<Patient>;
  findAll(): Promise<Patient[]>;
}
