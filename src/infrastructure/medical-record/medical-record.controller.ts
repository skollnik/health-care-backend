import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NewMedicalRecordDto } from './dtos/medical-record.dto';
import { MedicalRecordCreatedPresenter } from './presenters/medical-record-created.presenter';
import { CreateMedicalRecordCommand } from 'src/application/medical-record/commands/create-medical-record/create-medical-record.command';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly commandBus: CommandBus) {}

  //@UseGuards()
  @Post()
  async newMedicalRecord(
    @Body()
    {
      doctorId,
      patientId,
      appointmentId,
      diagnosis,
      medications,
    }: NewMedicalRecordDto,
  ) {
    const medicalRecord = await this.commandBus.execute(
      new CreateMedicalRecordCommand(
        doctorId,
        patientId,
        appointmentId,
        diagnosis,
        medications,
      ),
    );
    return new MedicalRecordCreatedPresenter(medicalRecord);
  }
}
