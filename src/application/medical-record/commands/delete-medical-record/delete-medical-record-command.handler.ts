import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMedicalRecordCommand } from './delete-medical-record.command';
import { MEDICALRECORD_REPOSITORY } from '../../medical-record.constants';
import { IMedicalRecordRepository } from 'src/domain/medical-record/interfaces/medical-record-repository.interface';
import { MedicalRecordNotFound } from 'src/domain/medical-record/exceptions/medical-record-not-found.exception';

@CommandHandler(DeleteMedicalRecordCommand)
export class DeleteMedicalRecordCommandHandler
  implements ICommandHandler<DeleteMedicalRecordCommand>
{
  constructor(
    @Inject(MEDICALRECORD_REPOSITORY)
    private readonly medicalRecordRepository: IMedicalRecordRepository,
  ) {}

  async execute({
    medicalRecordId,
  }: DeleteMedicalRecordCommand): Promise<void> {
    const medicalRecord = await this.medicalRecordRepository.findById(
      medicalRecordId,
    );
    if (!medicalRecord) throw new MedicalRecordNotFound();
    await this.medicalRecordRepository.delete(medicalRecordId);
  }
}
