import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { PostCreatedEvent } from 'src/domain/post/events/post-created.event';
import { IPatientRepository } from 'src/domain/specialization/interfaces/patient-repository.interface';
import { PATIENT_REPOSITORY } from 'src/domain/specialization/specialization.constants';

@EventsHandler(PostCreatedEvent)
export class PostCreatedEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: IPatientRepository,
    private readonly eventEmitter: EventEmitter2,
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}

  async handle(event: PostCreatedEvent): Promise<void> {
    const patients = await this.patientRepository.findAll();
    const emails = patients.map((p) => p.user.email);

    // await this.emailService.sendNewPostEmail(emails);
  }
}
