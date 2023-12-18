import { MedicalRecordEntity, MedicationEntity } from '@prisma/client';
import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { Medication } from 'src/domain/medication/model/medication';
import { IEntityMapperFactory } from 'src/infrastructure/shared/factories/entity-mapper-factory.interface';

export class MedicalRecordMapperFactory
  implements IEntityMapperFactory<MedicalRecordEntity, MedicalRecord>
{
  fromEntity({
    id,
    appointmentId,
    diagnosis,
    medications,
  }: MedicalRecordEntity & {
    medications?: MedicationEntity[];
  }): MedicalRecord {
    const medicationsMapped = medications
      ? medications.map((medication) =>
          Medication.create({
            id: medication.id,
            name: medication.name,
            description: medication.description,
          }),
        )
      : [];

    return MedicalRecord.create({
      id,
      appointmentId,
      diagnosis,
      medications: medicationsMapped,
    });
  }
}
