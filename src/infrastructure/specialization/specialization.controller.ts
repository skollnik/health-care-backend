import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { QueryBus } from '@nestjs/cqrs';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FindAllDoctorsQuery } from 'src/application/specialization/queries/find-all-doctors/find-all-doctors.query';
import { DoctorPresenter } from './presenters/doctor.presenter';
import { PatientPresenter } from './presenters/patient.presenter';
import { FindAllPatientsQuery } from 'src/application/specialization/queries/find-all-patients/find-all-patients.query';

@Controller('specialization')
@UseFilters(DomainErrorFilter)
export class SpecializationController {
  constructor(private readonly queryBus: QueryBus) {}

  //@UseGuards(JwtGuard)
  @Get('doctors')
  async getDoctors() {
    const doctors = await this.queryBus.execute(new FindAllDoctorsQuery());
    return doctors.map((doctor) => new DoctorPresenter(doctor));
  }

  //@UseGuards(JwtGuard)
  @Get('patients')
  async getPatients() {
    const patients = await this.queryBus.execute(new FindAllPatientsQuery());
    return patients.map((patient) => new PatientPresenter(patient));
  }
}
