import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPatientsQuery } from './get-all-patients.query';
import { PATIENT_REPOSITORY } from 'src/domain/specialization/specialization.constants';
import { IPatientRepository } from 'src/domain/specialization/interfaces/patient-repository.interface';

@QueryHandler(GetAllPatientsQuery)
export class GetAllPatientsQueryHandler
  implements IQueryHandler<GetAllPatientsQuery>
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
