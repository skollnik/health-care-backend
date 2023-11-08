import { MedicalRecord } from '../model/medical-record';

export interface IMedicalRecordRepository {
  create(medicalRecord: MedicalRecord): Promise<MedicalRecord>;
  findById(medicalRecordId: number): Promise<MedicalRecord>;
  delete(medicalRecordId: number): Promise<void>;
}
