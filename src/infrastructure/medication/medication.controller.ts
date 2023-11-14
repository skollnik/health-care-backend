import {
  Controller,
  Post,
  Delete,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NewMedicationDto } from './dtos/new-medication.dto';
import { MedicationCreatedPresenter } from './presenters/medication-created.presenter';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateMedicationCommand } from 'src/application/medicaton/commands/create-medication/create-medication.command';
import { DeleteMedicationCommand } from 'src/application/medicaton/commands/delete-medication/delete-medication.command';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from 'src/domain/auth/role.enum';
import { MedicationPresenter } from './presenters/medication.presenter';
import { EditMedicationCommand } from 'src/application/medicaton/commands/edit-medication/edit-medication.command';
import { EditMedicationDto } from './dtos/edit-medication.dto';
import { GetAllMedicationsQuery } from 'src/application/medicaton/queries/get-all-medications/get-all-medications.query';
import { GetMedicationQuery } from 'src/application/medicaton/queries/get-medication/get-medication.query';

@Controller('medication')
export class MedicationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
  @Get()
  async getAllMedications() {
    const medications = await this.queryBus.execute(
      new GetAllMedicationsQuery(),
    );
    return medications.map((medication) => new MedicationPresenter(medication));
  }

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':medicationId')
  async getMedicationById(
    @Param('medicationId', ParseIntPipe) medicationId: number,
  ) {
    const medication = await this.queryBus.execute(
      new GetMedicationQuery(medicationId),
    );
    return medication;
  }

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':medicationId')
  async editMedication(
    @Param('medicationId', ParseIntPipe) medicationId: number,
    @Body() { name, description }: EditMedicationDto,
  ) {
    await this.commandBus.execute(
      new EditMedicationCommand(medicationId, name, description),
    );

    return { status: 'Successfully updated!' };
  }

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':medicationId')
  async deleteMedication(
    @Param('medicationId', ParseIntPipe) medicationId: number,
  ) {
    await this.commandBus.execute(new DeleteMedicationCommand(medicationId));
    return { success: 'Successfully deleted!' };
  }
}
