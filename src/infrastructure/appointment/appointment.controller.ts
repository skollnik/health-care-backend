import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { NewAppointmentDto } from './dtos/new-appointment.dto';
import { CreateAppointmentCommand } from 'src/application/appointment/commands/create-appointment/create-appointment.command';
import { AppointmentCreatedPresenter } from './presenters/appointment-created.presenter';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from 'src/domain/auth/role.enum';
import { GetAllAppointmentsQuery } from 'src/application/appointment/queries/get-all-appointments/get-all-appointments.query';
import { AppointmentPresenter } from './presenters/appointment.presenter';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles(UserRole.PATIENT)
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async newAppointment(
    @Body()
    { doctorId, patientId, description, status, date }: NewAppointmentDto,
  ) {
    const appointment = await this.commandBus.execute(
      new CreateAppointmentCommand(
        doctorId,
        patientId,
        description,
        status,
        date,
      ),
    );
    return new AppointmentCreatedPresenter(appointment);
  }

  @Roles(UserRole.ADMINISTRATOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('all')
  async getAllAppointments() {
    const appointments = await this.queryBus.execute(
      new GetAllAppointmentsQuery(),
    );

    return appointments.map(
      (appointment) => new AppointmentPresenter(appointment),
    );
  }
}
