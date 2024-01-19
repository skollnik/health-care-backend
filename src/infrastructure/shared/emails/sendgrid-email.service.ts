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

  async sendNewAppointmentMail(email: string) {
    const content: EmailContent = {
      text: 'You have new appointment!',
      subject: 'New Appointment!',
      to: email,
    };
    await this.sendEmail(content);
  }

  async sendAppointmentUpdatedMail(email: string) {
    const content: EmailContent = {
      text: 'Neki tekst',
      subject: 'Appointment updated!',
      to: email,
    };
    await this.sendEmail(content);
  }

  async sendMedicalRecordCreatedMail(email: string) {
    const content: EmailContent = {
      text: 'Medical Record created!',
      subject: 'Medical Record created!',
      to: email,
    };
    await this.sendEmail(content);
  }

  async sendNewPostEmail(emails: string[]) {
    await Promise.all(
      emails.map(async (email) => {
        const content: EmailContent = {
          text: 'New post!',
          subject: 'New post!',
          to: email,
        };
        await this.sendEmail(content);
      }),
    );
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
