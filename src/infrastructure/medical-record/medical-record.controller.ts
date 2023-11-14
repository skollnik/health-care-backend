import { Controller, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NewMedicalRecordDto } from './dtos/new-medical-record.dto';
import { MedicalRecordCreatedPresenter } from './presenters/medical-record-created.presenter';
import { CreateMedicalRecordCommand } from 'src/application/medical-record/commands/create-medical-record/create-medical-record.command';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from 'src/domain/auth/role.enum';
import { DeleteMedicalRecordDto } from './dtos/delete-medical-record.dto';
import { DeleteMedicalRecordCommand } from 'src/application/medical-record/commands/delete-medical-record/delete-medical-record.command';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly commandBus: CommandBus) {}

  @Roles(UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
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

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete()
  async deleteMedicalRecordCommand(
    @Body() { medicalRecordId }: DeleteMedicalRecordDto,
  ) {
    await this.commandBus.execute(
      new DeleteMedicalRecordCommand(medicalRecordId),
    );
    return { success: 'Successfully deleted!' };
  }
}
