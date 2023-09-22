import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindAllDoctorsQuery } from './find-all-doctors.query';
import { DOCTOR_REPOSITORY } from 'src/domain/specialization/specialization.constants';
import { IDoctorRepository } from 'src/domain/specialization/interfaces/doctor-repository.interface';

@QueryHandler(FindAllDoctorsQuery)
export class FindAllDoctorsQueryHandler
  implements IQueryHandler<FindAllDoctorsQuery>
{
  constructor(
    @Inject(DOCTOR_REPOSITORY)
    private readonly doctorRepository: IDoctorRepository,
  ) {}

  async execute(): Promise<any> {
    const doctors = await this.doctorRepository.findAll();
    return doctors;
  }
}
