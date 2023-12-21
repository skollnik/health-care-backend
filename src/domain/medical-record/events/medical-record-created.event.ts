import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';

export class MedicalRecordCreatedEvent {
  constructor(
    public readonly medicalRecord: MedicalRecord,
    public readonly appointmentId: number,
  ) {}
}
