import { Inject } from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateAppointmentCommand } from './create-appointment.command';
import { APPOINTMENT_REPOSITORY } from '../../appointment.constants';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { AppointmentCreatedEvent } from '../../../../domain/appointment/events/appointment-created.event';

@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentCommandHandler
  implements ICommandHandler<CreateAppointmentCommand>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly eventBus: EventPublisher,
    private readonly eventPublisher: EventBus,
  ) {}
  async execute({
    doctorId,
    patientId,
    description,
    status,
    date,
  }: CreateAppointmentCommand): Promise<any> {
    const appointment = Appointment.create({
      doctorId,
      patientId,
      description,
      status,
      date,
    });
    const createdAppointment = this.eventBus.mergeObjectContext(
      await this.appointmentRepository.create(appointment),
    );

    createdAppointment.commit();

    this.eventPublisher.publish(
      new AppointmentCreatedEvent(appointment, doctorId),
    );

    return createdAppointment;
  }
}
