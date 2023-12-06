import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditAppointmentCommand } from './edit-appointment.command';
import { APPOINTMENT_REPOSITORY } from '../../appointment.constants';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';
import { Appointment } from 'src/domain/appointment/model/appointment';

@CommandHandler(EditAppointmentCommand)
export class EditAppointmentCommandHandler
  implements ICommandHandler<EditAppointmentCommand>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}
  async execute({ id, status }: EditAppointmentCommand): Promise<any> {
    const appointment = await this.appointmentRepository.findById(id);
    Appointment.throwIfNull(appointment);
    const appointmentObject = Appointment.create({ id, status });
    await this.appointmentRepository.update(appointmentObject);
  }
}
