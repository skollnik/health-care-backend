import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  EMAIL_SERVICE,
  IMAGE_UPLOAD_SERVICE,
} from 'src/application/shared/shared.constants';
import { SendgridEmailService } from './emails/sendgrid-email.service';
import { CloudinaryService } from './image-upload/cloudinary.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: EMAIL_SERVICE,
      useClass: SendgridEmailService,
    },
    {
      provide: IMAGE_UPLOAD_SERVICE,
      useClass: CloudinaryService,
    },
  ],
  exports: [EMAIL_SERVICE, IMAGE_UPLOAD_SERVICE],
})
export class SharedModule {}
