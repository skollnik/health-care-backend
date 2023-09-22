import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IEmailService } from 'src/application/shared/interfaces/email-service.interface';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { AccountCreatedEvent } from 'src/domain/auth/events/account-created.event';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedEventHandler
  implements IEventHandler<AccountCreatedEvent>
{
  constructor(
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}
  async handle({ email }: AccountCreatedEvent): Promise<void> {
    await this.emailService.sendAccountCreatedMail(email);
  }
}
