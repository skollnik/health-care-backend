import { MedicationEntity } from '@prisma/client';
import { Medication } from 'src/domain/medication/model/medication';
import { IEntityMapperFactory } from 'src/infrastructure/shared/factories/entity-mapper-factory.interface';

export class MedicationMapperFactory
  implements IEntityMapperFactory<MedicationEntity, Medication>
{
  fromEntity({ id, name, description }: MedicationEntity): Medication {
    return Medication.create({ id, name, description });
  }
}
