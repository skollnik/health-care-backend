import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMedicationCommand } from './delete-medication.command';
import { MEDICATION_REPOSITORY } from '../../medication.constants';
import { IMedicationRepository } from 'src/domain/medication/interfaces/medication-repository.interface';
import { MedicationNotFoundException } from 'src/domain/medication/exceptions/medication-not-found.exception';
import { Medication } from 'src/domain/medication/model/medication';

@CommandHandler(DeleteMedicationCommand)
export class DeleteMedicationCommandHandler
  implements ICommandHandler<DeleteMedicationCommand>
{
  constructor(
    @Inject(MEDICATION_REPOSITORY)
    private readonly medicationRepository: IMedicationRepository,
  ) {}

  async execute({ medicationId }: DeleteMedicationCommand): Promise<void> {
    const medication = await this.medicationRepository.findById(medicationId);
    Medication.throwIfNull(medication);
    await this.medicationRepository.delete(medicationId);
  }
}
