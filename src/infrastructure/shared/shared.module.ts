import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EMAIL_SERVICE } from 'src/application/shared/shared.constants';
import { SendgridEmailService } from './emails/sendgrid-email.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EMAIL_SERVICE,
      useClass: SendgridEmailService,
    },
  ],
  exports: [EMAIL_SERVICE],
})
export class SharedModule {}
