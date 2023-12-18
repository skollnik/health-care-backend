import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { Medication } from 'src/domain/medication/model/medication';

export class MedicalRecordCreatedPresenter {
  public readonly id: number;
  public readonly appointmentId: number;
  public readonly medications?: Medication[];
  constructor({ id, appointmentId, medications }: MedicalRecord) {
    this.id = id;
    this.appointmentId = appointmentId;
    this.medications = medications;
  }
}
