import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMedicationQuery } from './get-medication.query';
import { MEDICATION_REPOSITORY } from '../../medication.constants';
import { IMedicationRepository } from 'src/domain/medication/interfaces/medication-repository.interface';
import { Medication } from 'src/domain/medication/model/medication';

@QueryHandler(GetMedicationQuery)
export class GetMedicationQueryHandler
  implements IQueryHandler<GetMedicationQuery>
{
  constructor(
    @Inject(MEDICATION_REPOSITORY)
    private readonly medicationRepository: IMedicationRepository,
  ) {}
  async execute({ id }: GetMedicationQuery): Promise<any> {
    const medication = await this.medicationRepository.findById(id);
    Medication.throwIfNull(medication);

    return medication;
  }
}
