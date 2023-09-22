import { Medication } from 'src/domain/medication/model/medication';

export class CreateMedicalRecordCommand {
  constructor(
    public readonly doctorId: number,
    public readonly patientId: number,
    public readonly appointmentId: number,
    public readonly diagnosis: string,
    public readonly medications?: Medication[],
  ) {}
}
