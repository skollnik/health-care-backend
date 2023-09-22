import { AggregateRoot } from '@nestjs/cqrs';
import { Medication } from 'src/domain/medication/model/medication';

export class MedicalRecord extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly doctorId: number,
    public readonly patientId: number,
    public readonly appointmentId: number,
    public readonly diagnosis: string,
    public readonly medications?: Medication[],
  ) {
    super();
  }

  static create({
    id,
    doctorId,
    patientId,
    appointmentId,
    diagnosis,
    medications = [],
  }: Partial<MedicalRecord>) {
    return new MedicalRecord(
      id,
      doctorId,
      patientId,
      appointmentId,
      diagnosis,
      medications,
    );
  }
}
