import { Injectable } from '@nestjs/common';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { AppointmentMapperFactory } from '../factories/appointment-mapper.factory';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appointmentMapperFactory: AppointmentMapperFactory,
  ) {}
  async create({
    doctorId,
    patientId,
    status,
    date,
  }: Appointment): Promise<Appointment> {
    const saved = await this.prisma.appointmentEntity.create({
      data: {
        doctorId,
        patientId,
        status,
        date,
      },
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
        patient: {
          include: {
            user: true,
          },
        },
      },
    });
    return this.appointmentMapperFactory.fromEntity(saved);
  }

  async delete(appointmentId: number): Promise<void> {
    await this.prisma.appointmentEntity.delete({
      where: { id: appointmentId },
    });
  }
}
