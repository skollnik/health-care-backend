import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMedicationCommand } from './delete-medication.command';
import { MEDICATION_REPOSITORY } from '../../medication.constants';
import { IMedicationRepository } from 'src/domain/medication/interfaces/medication-repository.interface';
import { USER_REPOSITORY } from 'src/application/auth/auth.constants';
import { IUserRepository } from 'src/domain/auth/interfaces/user-repository.interface';
import { UserRole } from 'src/domain/auth/role.enum';
import { NotAllowedToDeleteMedication } from 'src/domain/medication/exceptions/not-allowed-to-delete-medication.exception';
import { MedicationNotFound } from 'src/domain/medication/exceptions/medication-not-found.exception';

@CommandHandler(DeleteMedicationCommand)
export class DeleteMedicationCommandHandler
  implements ICommandHandler<DeleteMedicationCommand>
{
  constructor(
    @Inject(MEDICATION_REPOSITORY)
    private readonly medicationRepository: IMedicationRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    authorized,
    medicationId,
  }: DeleteMedicationCommand): Promise<void> {
    const isAuthorized = await this.userRepository.findById(authorized);
    if (isAuthorized.role === UserRole.PATIENT)
      throw new NotAllowedToDeleteMedication();
    const medication = await this.medicationRepository.findById(medicationId);
    if (!medication) throw new MedicationNotFound();
    await this.medicationRepository.deleteMedication(medicationId);
  }
}
