import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { MedicalRecordCreatedEvent } from 'src/domain/medical-record/events/medical-record-created.event';
import { IPatientRepository } from 'src/domain/specialization/interfaces/patient-repository.interface';
import { PATIENT_REPOSITORY } from 'src/domain/specialization/specialization.constants';
import { MedicalRecordCreatedPayload } from './internal/medical-record-created-payload.dto';
import { APPOINTMENT_REPOSITORY } from 'src/application/appointment/appointment.constants';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';

@EventsHandler(MedicalRecordCreatedEvent)
export class MedicalRecordCreatedEventHandler
  implements IEventHandler<MedicalRecordCreatedEvent>
{
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientRepository,
    @Inject(APPOINTMENT_REPOSITORY)
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly eventEmitter: EventEmitter2,
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}

  async handle({
    appointmentId,
    medicalRecord,
  }: MedicalRecordCreatedEvent): Promise<void> {
    const appointment = await this.appointmentRepository.findById(
      appointmentId,
    );

    this.eventEmitter.emit(
      'medical-record.created',
      new MedicalRecordCreatedPayload(
        appointment.patient.userId,
        medicalRecord,
      ),
    );

    // await this.emailService.sendMedicalRecordCreatedMail(patient.user.email);
  }
}
