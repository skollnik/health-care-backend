import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';

export class MedicalRecordCreatedPayload {
  constructor(
    public readonly id: number,
    public readonly medicalRecord: MedicalRecord,
  ) {}
}
