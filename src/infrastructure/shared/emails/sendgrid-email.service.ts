import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import {
  ACCOUNT_CREATED_SUBJECT,
  ACCOUNT_CREATED_TEXT,
  SENDGRID_API_KEY,
  SENDGRID_SENDER,
} from 'src/infrastructure/shared/emails/email.constants';
import { ConfigService } from '@nestjs/config';
import {
  EmailContent,
  IEmailService,
} from 'src/application/shared/interfaces/email-service.interface';

@Injectable()
export class SendgridEmailService implements IEmailService {
  constructor(private readonly configService: ConfigService) {
    const apiKey = configService.get(SENDGRID_API_KEY);
    sendgrid.setApiKey(apiKey);
  }

  async sendAccountCreatedMail(email: string) {
    const content: EmailContent = {
      text: ACCOUNT_CREATED_TEXT,
      subject: ACCOUNT_CREATED_SUBJECT,
      to: email,
    };
    await this.sendEmail(content);
  }

  private async sendEmail({ text, subject, to, html }: EmailContent) {
    const from = this.configService.get(SENDGRID_SENDER);
    const content: sendgrid.MailDataRequired = {
      from,
      subject,
      to,
      text,
      html,
    };

    await sendgrid.send(content);
  }
}
