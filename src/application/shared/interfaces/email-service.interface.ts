export type EmailContent = {
  html?: string;
  text?: string;
  subject: string;
  to: string;
};

export interface IEmailService {
  sendAccountCreatedMail(email: string);
}
