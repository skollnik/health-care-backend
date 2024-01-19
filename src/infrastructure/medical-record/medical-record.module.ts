import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { MEDICALRECORD_REPOSITORY } from 'src/application/medical-record/medical-record.constants';
import { MedicalRecordRepository } from './repositories/medical-record.repository';
import { MedicalRecordMapperFactory } from './factories/medical-record-mapper.factory';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../shared/shared.module';
import { MedicalRecordController } from './medical-record.controller';
import { CreateMedicalRecordCommandHandler } from 'src/application/medical-record/commands/create-medical-record/create-medical-record-command.handler';
import { DeleteMedicalRecordCommandHandler } from 'src/application/medical-record/commands/delete-medical-record/delete-medical-record-command.handler';
import { MedicalRecordCreatedEventHandler } from 'src/application/medical-record/events/medical-record-created-event.handler';
import { SpecializationModule } from '../specialization/specialization.module';
import { AppointmentModule } from '../appointment/appointment.module';

const commandHandlers = [
  CreateMedicalRecordCommandHandler,
  DeleteMedicalRecordCommandHandler,
];

const events: Provider[] = [MedicalRecordCreatedEventHandler];

const providers: Provider[] = [
  {
    provide: MEDICALRECORD_REPOSITORY,
    useClass: MedicalRecordRepository,
  },
  MedicalRecordMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule, SpecializationModule, AppointmentModule],
  controllers: [MedicalRecordController],
  providers: [...commandHandlers, ...events, ...providers],
  exports: [MEDICALRECORD_REPOSITORY],
})
export class MedicalRecordModule {}
