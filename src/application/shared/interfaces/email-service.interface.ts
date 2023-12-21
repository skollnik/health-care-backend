export type EmailContent = {
  html?: string;
  text?: string;
  subject: string;
  to: string;
};

export interface IEmailService {
  sendAccountCreatedMail(email: string);
  sendNewAppointmentMail(email: string);
  sendAppointmentUpdatedMail(email: string);
  sendMedicalRecordCreatedMail(email: string);
}
