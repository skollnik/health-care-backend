import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';

export class MedicalRecordCreatedPresenter {
  public readonly id: number;
  public readonly doctorId: number;
  public readonly patientId: number;
  public readonly appointmentId: number;
  constructor({ id, doctorId, patientId, appointmentId }: MedicalRecord) {
    this.id = id;
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.appointmentId = appointmentId;
  }
}
