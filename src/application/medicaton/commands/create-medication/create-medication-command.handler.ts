import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateMedicationCommand } from './create-medication.command';
import { Medication } from 'src/domain/medication/model/medication';
import { IMedicationRepository } from 'src/domain/medication/interfaces/medication-repository.interface';
import { MEDICATION_REPOSITORY } from '../../medication.constants';

@CommandHandler(CreateMedicationCommand)
export class CreateMedicationCommandHandler
  implements ICommandHandler<CreateMedicationCommand>
{
  constructor(
    @Inject(MEDICATION_REPOSITORY)
    private readonly medicationRepository: IMedicationRepository,
    private readonly eventBus: EventPublisher,
  ) {}
  async execute({ name, description }: CreateMedicationCommand): Promise<any> {
    const medication = Medication.create({ name, description });
    const createdMedication = this.eventBus.mergeObjectContext(
      await this.medicationRepository.create(medication),
    );
    createdMedication.commit();
    return createdMedication;
  }
}
