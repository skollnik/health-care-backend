import { MedicalRecordEntity } from '@prisma/client';
import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { IEntityMapperFactory } from 'src/infrastructure/shared/factories/entity-mapper-factory.interface';

export class MedicalRecordMapperFactory
  implements IEntityMapperFactory<MedicalRecordEntity, MedicalRecord>
{
  fromEntity({
    id,
    doctorId,
    patientId,
    appointmentId,
    diagnosis,
  }: MedicalRecordEntity): MedicalRecord {
    return MedicalRecord.create({
      id,
      doctorId,
      patientId,
      appointmentId,
      diagnosis,
    });
  }
}
