import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { IDoctorRepository } from 'src/domain/specialization/interfaces/doctor-repository.interface';
import { DOCTOR_REPOSITORY } from 'src/domain/specialization/specialization.constants';
import { AppointmentCreatedEvent } from '../../../domain/appointment/events/appointment-created.event';
import { AppointmentCreatedPayload } from './internal/appointment-created-payload.dto';

@EventsHandler(AppointmentCreatedEvent)
export class AppointmentCreatedEventHandler
  implements IEventHandler<AppointmentCreatedEvent>
{
  constructor(
    @Inject(DOCTOR_REPOSITORY)
    private readonly doctorRepository: IDoctorRepository,
    private readonly eventEmitter: EventEmitter2,
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}

  async handle({
    appointment,
    doctorId,
  }: AppointmentCreatedEvent): Promise<void> {
    const doctor = await this.doctorRepository.findById(doctorId);

    this.eventEmitter.emitAsync(
      'appointment.created',
      new AppointmentCreatedPayload(doctor.userId, appointment),
    );

    // await this.emailService.sendNewAppointmentMail(doctor.user.email);
  }
}
