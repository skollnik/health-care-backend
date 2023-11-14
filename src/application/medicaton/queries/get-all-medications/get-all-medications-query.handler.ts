import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MEDICATION_REPOSITORY } from '../../medication.constants';
import { IMedicationRepository } from 'src/domain/medication/interfaces/medication-repository.interface';
import { GetAllMedicationsQuery } from './get-all-medications.query';

@QueryHandler(GetAllMedicationsQuery)
export class GetAllMedicationsQueryHandler
  implements IQueryHandler<GetAllMedicationsQuery>
{
  constructor(
    @Inject(MEDICATION_REPOSITORY)
    private readonly medicationRepository: IMedicationRepository,
  ) {}
  async execute(): Promise<any> {
    const medications = await this.medicationRepository.findAll();
    return medications;
  }
}
