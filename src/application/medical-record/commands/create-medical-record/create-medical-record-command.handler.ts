import { Inject } from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { IMedicalRecordRepository } from 'src/domain/medical-record/interfaces/medical-record-repository.interface';
import { CreateMedicalRecordCommand } from './create-medical-record.command';
import { MEDICALRECORD_REPOSITORY } from '../../medical-record.constants';
import { MedicalRecordCreatedEvent } from 'src/domain/medical-record/events/medical-record-created.event';

@CommandHandler(CreateMedicalRecordCommand)
export class CreateMedicalRecordCommandHandler
  implements ICommandHandler<CreateMedicalRecordCommand>
{
  constructor(
    @Inject(MEDICALRECORD_REPOSITORY)
    private readonly medicalRecordRepository: IMedicalRecordRepository,
    private readonly eventBus: EventPublisher,
    private readonly eventPublisher: EventBus,
  ) {}
  async execute({
    appointmentId,
    diagnosis,
    medications,
  }: CreateMedicalRecordCommand): Promise<any> {
    const medicalRecord = MedicalRecord.create({
      appointmentId,
      diagnosis,
      medications,
    });
    const createdMedicalRecord = this.eventBus.mergeObjectContext(
      await this.medicalRecordRepository.create(medicalRecord),
    );

    createdMedicalRecord.commit();
    this.eventPublisher.publish(
      new MedicalRecordCreatedEvent(medicalRecord, appointmentId),
    );

    return createdMedicalRecord;
  }
}
