import { Medication } from '../model/medication';

export interface IMedicationRepository {
  create(medication: Medication): Promise<Medication>;
  findById(medicationId: number): Promise<Medication>;
  findAll(): Promise<Medication[]>;
  update(medication: Medication): Promise<Medication>;
  delete(medicationId: number): Promise<void>;
}
