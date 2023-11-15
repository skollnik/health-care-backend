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
import { DeleteMedicationCommandHandler } from 'src/application/medicaton/commands/delete-medication/delete-medication-command.handler';
import { AuthModule } from '../auth/auth.module';
import { GetAllMedicationsQueryHandler } from 'src/application/medicaton/queries/get-all-medications/get-all-medications-query.handler';
import { EditMedicationCommandHandler } from 'src/application/medicaton/commands/edit-medication/edit-medication-command.handler';
import { GetMedicationQueryHandler } from 'src/application/medicaton/queries/get-medication/get-medication-query.handler';

const commmandHandler = [
  EditMedicationCommandHandler,
  CreateMedicationCommandHandler,
  DeleteMedicationCommandHandler,
];

const queries: Provider[] = [
  GetMedicationQueryHandler,
  GetAllMedicationsQueryHandler,
];

const providers: Provider[] = [
  {
    provide: MEDICATION_REPOSITORY,
    useClass: MedicationRepository,
  },
  MedicationMapperFactory,
];

@Module({
  imports: [PrismaModule, CqrsModule, SharedModule, AuthModule],
  controllers: [MedicationController],
  providers: [...commmandHandler, ...queries, ...providers],
  exports: [MEDICATION_REPOSITORY],
})
export class MedicationModule {}
