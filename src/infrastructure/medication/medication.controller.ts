import { Controller, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NewMedicationDto } from './dtos/new-medication.dto';
import { MedicationCreatedPresenter } from './presenters/medication-created.presenter';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateMedicationCommand } from 'src/application/medicaton/commands/create-medication/create-medication.command';

@Controller('medication')
export class MedicationController {
  constructor(private readonly commandBus: CommandBus) {}

  //   @UseGuards(JwtGuard)
  @Post()
  async newMedication(@Body() { name, description }: NewMedicationDto) {
    const medication = await this.commandBus.execute(
      new CreateMedicationCommand(name, description),
    );
    return new MedicationCreatedPresenter(medication);
  }

  @Delete()
  async deleteMedication(@Body()) {

  }
}
