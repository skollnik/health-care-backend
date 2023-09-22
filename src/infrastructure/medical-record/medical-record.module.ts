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

const commandHandlers = [CreateMedicalRecordCommandHandler];

const providers: Provider[] = [
  {
    provide: MEDICALRECORD_REPOSITORY,
    useClass: MedicalRecordRepository,
  },
  MedicalRecordMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [MedicalRecordController],
  providers: [...commandHandlers, ...providers],
  exports: [MEDICALRECORD_REPOSITORY],
})
export class MedicalRecordModule {}
