import { Medication } from 'src/domain/medication/model/medication';

export class CreateMedicalRecordCommand {
  constructor(
    public readonly appointmentId: number,
    public readonly diagnosis: string,
    public readonly medications?: Medication[],
  ) {}
}
