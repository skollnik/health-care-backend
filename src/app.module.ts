import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from './infrastructure/appointment/appointment.module';
import { MedicationModule } from './infrastructure/medication/medication.module';
import { MedicalRecordModule } from './infrastructure/medical-record/medical-record.module';
import { SpecializationModule } from './infrastructure/specialization/specialization.module';
import { WebSocketModule } from './infrastructure/sockets/websocket.module';
import { PostModule } from './infrastructure/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    AuthModule,
    SpecializationModule,
    AppointmentModule,
    MedicationModule,
    MedicalRecordModule,
    PostModule,
    WebSocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
