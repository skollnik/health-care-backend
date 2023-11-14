import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditMedicationCommand } from './edit-medication.command';
import { MEDICATION_REPOSITORY } from '../../medication.constants';
import { Medication } from 'src/domain/medication/model/medication';
import { IMedicationRepository } from 'src/domain/medication/interfaces/medication-repository.interface';

@CommandHandler(EditMedicationCommand)
export class EditMedicationCommandHandler
  implements ICommandHandler<EditMedicationCommand>
{
  constructor(
    @Inject(MEDICATION_REPOSITORY)
    private readonly medicationRepository: IMedicationRepository,
  ) {}
  async execute({
    id,
    name,
    description,
  }: EditMedicationCommand): Promise<any> {
    const medication = await this.medicationRepository.findById(id);
    Medication.throwIfNull(medication);
    const medicationObject = Medication.create({ id, name, description });
    await this.medicationRepository.update(medicationObject);
  }
}
