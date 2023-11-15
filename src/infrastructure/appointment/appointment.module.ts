import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AppointmentController } from './appointment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../shared/shared.module';
import { CreateAppointmentCommandHandler } from 'src/application/appointment/commands/create-appointment/create-appointment-command.handler';
import { APPOINTMENT_REPOSITORY } from 'src/application/appointment/appointment.constants';
import { AppointmentRepository } from './repositories/appointment.repository';
import { AppointmentMapperFactory } from './factories/appointment-mapper.factory';
import { GetAllAppointmentsQueryHandler } from 'src/application/appointment/queries/get-all-appointments/get-all-appointments-query.handler';

const commandHandlers = [CreateAppointmentCommandHandler];

const queries: Provider[] = [GetAllAppointmentsQueryHandler];

const providers: Provider[] = [
  {
    provide: APPOINTMENT_REPOSITORY,
    useClass: AppointmentRepository,
  },
  AppointmentMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [AppointmentController],
  providers: [...commandHandlers, ...queries, ...providers],
  exports: [APPOINTMENT_REPOSITORY],
})
export class AppointmentModule {}
