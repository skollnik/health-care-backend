import { MedicalRecord } from '../model/medical-record';

export interface IMedicalRecordRepository {
  create(medicalRecord: MedicalRecord): Promise<MedicalRecord>;
}
