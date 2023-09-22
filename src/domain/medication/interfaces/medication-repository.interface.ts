import { Medication } from '../model/medication';

export interface IMedicationRepository {
  create(medication: Medication): Promise<Medication>;
  findById(medicationId: number): Promise<Medication>;
  deleteMedication(medicationId: number): Promise<void>;
}