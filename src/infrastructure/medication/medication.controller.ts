import { Controller, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NewMedicationDto } from './dtos/new-medication.dto';
import { MedicationCreatedPresenter } from './presenters/medication-created.presenter';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateMedicationCommand } from 'src/application/medicaton/commands/create-medication/create-medication.command';
import { DeleteMedicationCommand } from 'src/application/medicaton/commands/delete-medication/delete-medication.command';
import { DeleteMedicationDto } from './dtos/delete-medication.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from 'src/domain/auth/role.enum';

@Controller('medication')
export class MedicationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async newMedication(@Body() { name, description }: NewMedicationDto) {
    const medication = await this.commandBus.execute(
      new CreateMedicationCommand(name, description),
    );
    return new MedicationCreatedPresenter(medication);
  }

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete()
  async deleteMedication(@Body() { medicationId }: DeleteMedicationDto) {
    await this.commandBus.execute(new DeleteMedicationCommand(medicationId));
    return { success: 'Successfully deleted!' };
  }
}
