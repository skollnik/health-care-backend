import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Req,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { NewAppointmentDto } from './dtos/new-appointment.dto';
import { CreateAppointmentCommand } from 'src/application/appointment/commands/create-appointment/create-appointment.command';
import { AppointmentCreatedPresenter } from './presenters/appointment-created.presenter';
import { ReqWithUser, RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from 'src/domain/auth/role.enum';
import { GetAllAppointmentsQuery } from 'src/application/appointment/queries/get-all-appointments/get-all-appointments.query';
import { AppointmentPresenter } from './presenters/appointment.presenter';
import { GetAllAppointmentsByDoctorId } from 'src/application/appointment/queries/get-all-appointments-by-doctor-id/get-all-appointments-by-doctor-id.query';
import { GetAllAppointmentsByPatientId } from 'src/application/appointment/queries/get-all-appointments-by-patient-id/get-all-appointments-by-patient-id-query.handler';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';
import { EditAppointmentCommand } from 'src/application/appointment/commands/edit-appointment/edit-appointment.command';

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
    @Req() { user }: ReqWithUser,
    @Body()
    { doctorId, description, date }: NewAppointmentDto,
  ) {
    const appointment = await this.commandBus.execute(
      new CreateAppointmentCommand(
        doctorId,
        user.patient.id,
        description,
        AppointmentStatus.PENDING,
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

  @Roles(UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/doctor')
  async getAllAppointmentsByDoctorId(@Req() { user }: ReqWithUser) {
    const appointments = await this.queryBus.execute(
      new GetAllAppointmentsByDoctorId(user.doctor.id),
    );
    return appointments.map(
      (appointment) => new AppointmentPresenter(appointment),
    );
  }

  @Roles(UserRole.PATIENT)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/patient')
  async getAllAppointmentsByPatientId(@Req() { user }: ReqWithUser) {
    const appointments = await this.queryBus.execute(
      new GetAllAppointmentsByPatientId(user.patient.id),
    );
    return appointments.map(
      (appointment) => new AppointmentPresenter(appointment),
    );
  }

  @Roles(UserRole.DOCTOR)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':appointmentId')
  async editAppointment(
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Body() body: { status: AppointmentStatus },
  ) {
    await this.commandBus.execute(
      new EditAppointmentCommand(appointmentId, body.status),
    );

    return { status: 'Successfully updated!' };
  }
}
