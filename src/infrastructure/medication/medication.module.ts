import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { MEDICATION_REPOSITORY } from 'src/application/medicaton/medication.constants';
import { MedicationRepository } from './repositories/medication.repository';
import { MedicationMapperFactory } from './factories/medication-mapper.factory';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from '../shared/shared.module';
import { MedicationController } from './medication.controller';
import { CreateMedicationCommandHandler } from 'src/application/medicaton/commands/create-medication/create-medication-command.handler';

const commmandHandler = [CreateMedicationCommandHandler];

const providers: Provider[] = [
  {
    provide: MEDICATION_REPOSITORY,
    useClass: MedicationRepository,
  },
  MedicationMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule],
  controllers: [MedicationController],
  providers: [...commmandHandler, ...providers],
  exports: [MEDICATION_REPOSITORY],
})
export class MedicationModule {}
