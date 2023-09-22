import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import {
  DOCTOR_REPOSITORY,
  PATIENT_REPOSITORY,
} from 'src/domain/specialization/specialization.constants';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorMapperFactory } from './factories/doctor-mapper.factory';
import { FindAllDoctorsQueryHandler } from 'src/application/specialization/queries/find-all-doctors/find-all-doctors-query.handler';
import { FindAllPatientsQueryHandler } from 'src/application/specialization/queries/find-all-patients/find-all-patients-query.handler';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../shared/shared.module';
import { SpecializationController } from './specialization.controller';
import { PatientMapperFactory } from './factories/patient-mapper.factory';
import { PatientRepository } from './repositories/patient.repository';

const providers: Provider[] = [
  {
    provide: DOCTOR_REPOSITORY,
    useClass: DoctorRepository,
  },
  {
    provide: PATIENT_REPOSITORY,
    useClass: PatientRepository,
  },
  DoctorMapperFactory,
  PatientMapperFactory,
];

const queries: Provider[] = [
  FindAllDoctorsQueryHandler,
  FindAllPatientsQueryHandler,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [SpecializationController],
  providers: [...providers, ...queries],
  exports: [DOCTOR_REPOSITORY, PATIENT_REPOSITORY],
})
export class SpecializationModule {}
