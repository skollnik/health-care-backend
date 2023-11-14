import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { QueryBus } from '@nestjs/cqrs';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetAllDoctorsQuery } from 'src/application/specialization/queries/get-all-doctors/get-all-doctors.query';
import { DoctorPresenter } from './presenters/doctor.presenter';
import { PatientPresenter } from './presenters/patient.presenter';
import { GetAllPatientsQuery } from 'src/application/specialization/queries/get-all-patients/get-all-patients.query';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from 'src/domain/auth/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('specialization')
@UseFilters(DomainErrorFilter)
export class SpecializationController {
  constructor(private readonly queryBus: QueryBus) {}

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('doctors')
  async getDoctors() {
    const doctors = await this.queryBus.execute(new GetAllDoctorsQuery());
    return doctors.map((doctor) => new DoctorPresenter(doctor));
  }

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('patients')
  async getPatients() {
    const patients = await this.queryBus.execute(new GetAllPatientsQuery());
    return patients.map((patient) => new PatientPresenter(patient));
  }
}
