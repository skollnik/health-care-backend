import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { AppointmentUpdatedEvent } from 'src/domain/appointment/events/appointment-updated.event';
import { IPatientRepository } from 'src/domain/specialization/interfaces/patient-repository.interface';
import {
  DOCTOR_REPOSITORY,
  PATIENT_REPOSITORY,
} from 'src/domain/specialization/specialization.constants';
import { AppointmentUpdatedPayload } from './internal/appointment-updated-payload.dto';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';
import { APPOINTMENT_REPOSITORY } from '../appointment.constants';
import { IDoctorRepository } from 'src/domain/specialization/interfaces/doctor-repository.interface';

@EventsHandler(AppointmentUpdatedEvent)
export class AppointmentUpdatedEventHandler
  implements IEventHandler<AppointmentUpdatedEvent>
{
  constructor(
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientRepository,
    @Inject(DOCTOR_REPOSITORY)
    private readonly doctorRepository: IDoctorRepository,
    private readonly eventEmitter: EventEmitter2,
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}

  async handle({ appointment }: AppointmentUpdatedEvent): Promise<void> {
    const appointmentObject = await this.appointmentRepository.findById(
      appointment.id,
    );
    const patient = await this.patientRepository.findById(
      appointmentObject.patientId,
    );
    
    this.eventEmitter.emit(
      'appointment.updated',
      new AppointmentUpdatedPayload(patient.userId, appointmentObject),
    );

    // await this.emailService.sendAppointmentUpdatedMail(patient.user.email );
  }
}
