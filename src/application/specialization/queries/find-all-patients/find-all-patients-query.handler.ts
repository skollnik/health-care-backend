import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllPatientsQuery } from './find-all-patients.query';
import { PATIENT_REPOSITORY } from 'src/domain/specialization/specialization.constants';
import { IPatientRepository } from 'src/domain/specialization/interfaces/patient-repository.interface';

@QueryHandler(FindAllPatientsQuery)
export class FindAllPatientsQueryHandler
  implements IQueryHandler<FindAllPatientsQuery>
{
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientRepository,
  ) {}

  async execute(): Promise<any> {
    const patients = await this.patientRepository.findAll();
    return patients;
  }
}
