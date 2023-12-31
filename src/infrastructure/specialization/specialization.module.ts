import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import {
  DOCTOR_REPOSITORY,
  PATIENT_REPOSITORY,
} from 'src/domain/specialization/specialization.constants';
import { DoctorRepository } from './repositories/doctor.repository';
import { DoctorMapperFactory } from './factories/doctor-mapper.factory';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../shared/shared.module';
import { SpecializationController } from './specialization.controller';
import { PatientMapperFactory } from './factories/patient-mapper.factory';
import { PatientRepository } from './repositories/patient.repository';
import { GetAllDoctorsQueryHandler } from 'src/application/specialization/queries/get-all-doctors/get-all-doctors-query.handler';
import { GetAllPatientsQueryHandler } from 'src/application/specialization/queries/get-all-patients/get-all-patients-query.handler';

const queries: Provider[] = [
  GetAllDoctorsQueryHandler,
  GetAllPatientsQueryHandler,
];

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

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [SpecializationController],
  providers: [...queries, ...providers],
  exports: [DOCTOR_REPOSITORY, PATIENT_REPOSITORY],
})
export class SpecializationModule {}
