import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { NewAppointmentDto } from './dtos/new-appointment.dto';
import { CreateAppointmentCommand } from 'src/application/appointment/commands/create-appointment/create-appointment.command';
import { AppointmentCreatedPresenter } from './presenters/appointment-created.presenter';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from 'src/domain/auth/role.enum';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR, UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async newAppointment(
    @Body() { doctorId, patientId, status, date }: NewAppointmentDto,
  ) {
    const appointment = await this.commandBus.execute(
      new CreateAppointmentCommand(doctorId, patientId, status, date),
    );
    return new AppointmentCreatedPresenter(appointment);
  }
}
