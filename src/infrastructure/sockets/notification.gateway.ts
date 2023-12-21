import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { USER_REPOSITORY } from 'src/application/auth/auth.constants';
import { IUserRepository } from 'src/domain/auth/interfaces/user-repository.interface';
import { SocketWithUser } from './socket-with-user.type';
import { OnEvent } from '@nestjs/event-emitter';
import { AppointmentCreatedPayload } from 'src/application/appointment/events/internal/appointment-created-payload.dto';
import { AppointmentUpdatedPayload } from 'src/application/appointment/events/internal/appointment-updated-payload.dto';
import { MedicalRecordCreatedPayload } from 'src/application/medical-record/events/internal/medical-record-created-payload.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export default class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;
  private connections: Map<number, Socket> = new Map();

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async handleConnection(client: SocketWithUser, ...args: any[]) {
    const userId = client.userId;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      client.disconnect();
    }
    this.connections.set(userId, client);
  }

  handleDisconnect(client: SocketWithUser) {
    const userId = client.userId;
    this.connections.delete(userId);
  }

  afterInit(): void {}

  @OnEvent('appointment.created')
  handleAppointmentCreated({ id, appointment }: AppointmentCreatedPayload) {
    this.connections.forEach((socket: Socket, key: number) => {
      if (id === key) {
        socket.emit('appointmentCreatedNotification', {
          id: appointment.id,
          doctor: appointment.doctor,
          patient: appointment.patient,
          description: appointment.description,
          date: appointment.date,
          status: appointment.status,
        });
      }
    });
  }

  @OnEvent('appointment.updated')
  handleAppointmentUpdated({ id, appointment }: AppointmentUpdatedPayload) {
    this.connections.forEach((socket: Socket, key: number) => {
      if (id === key) {
        socket.emit('appointmentUpdatedNotification', {
          id: appointment.id,
          doctor: appointment.doctor,
          patient: appointment.patient,
          description: appointment.description,
          date: appointment.date,
          status: appointment.status,
        });
      }
    });
  }

  @OnEvent('medical-record.created')
  handleMedicalRecordCreated({
    id,
    medicalRecord,
  }: MedicalRecordCreatedPayload) {
    this.connections.forEach((socket: Socket, key: number) => {
      if (id === key) {
        socket.emit('medicalRecordCreatedNotification', {
          id: medicalRecord.id,
          diagnosis: medicalRecord.diagnosis,
          medications: medicalRecord.medications,
        });
      }
    });
  }
}
