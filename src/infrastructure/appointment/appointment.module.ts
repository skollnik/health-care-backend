import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CqrsModule } from '@nestjs/cqrs';
import { APPOINTMENT_REPOSITORY } from 'src/application/appointment/appointment.constants';
import { CreateAppointmentCommandHandler } from 'src/application/appointment/commands/create-appointment/create-appointment-command.handler';
import { EditAppointmentCommandHandler } from 'src/application/appointment/commands/edit-appointment/edit-appointment-command.handler';
import { AppointmentCreatedEventHandler } from 'src/application/appointment/events/appointment-created-event.handler';
import { GetAllAppointmentsByDoctorIdHandler } from 'src/application/appointment/queries/get-all-appointments-by-doctor-id/get-all-appointments-by-doctor-id-query.handler';
import { GetAllAppointmentsByPatientIdHandler } from 'src/application/appointment/queries/get-all-appointments-by-patient-id/get-all-appointments-by-patient-id.query';
import { GetAllAppointmentsQueryHandler } from 'src/application/appointment/queries/get-all-appointments/get-all-appointments-query.handler';
import { PrismaModule } from '../prisma/prisma.module';
import { SharedModule } from '../shared/shared.module';
import { SpecializationModule } from '../specialization/specialization.module';
import { AppointmentController } from './appointment.controller';
import { AppointmentMapperFactory } from './factories/appointment-mapper.factory';
import { AppointmentRepository } from './repositories/appointment.repository';
import { AppointmentUpdatedEventHandler } from 'src/application/appointment/events/appointment-updated-event.handler';
import { MedicalRecordCreatedEventHandler } from 'src/application/medical-record/events/medical-record-created-event.handler';

const commandHandlers = [
  CreateAppointmentCommandHandler,
  EditAppointmentCommandHandler,
];

const queries: Provider[] = [
  GetAllAppointmentsQueryHandler,
  GetAllAppointmentsByDoctorIdHandler,
  GetAllAppointmentsByPatientIdHandler,
];

const events: Provider[] = [
  AppointmentCreatedEventHandler,
  AppointmentUpdatedEventHandler,
  MedicalRecordCreatedEventHandler,
];

const providers: Provider[] = [
  {
    provide: APPOINTMENT_REPOSITORY,
    useClass: AppointmentRepository,
  },
  AppointmentMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule, SpecializationModule],
  controllers: [AppointmentController],
  providers: [...commandHandlers, ...queries, ...events, ...providers],
  exports: [APPOINTMENT_REPOSITORY],
})
export class AppointmentModule {}
