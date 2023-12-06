import { Injectable } from '@nestjs/common';
import { IAppointmentRepository } from 'src/domain/appointment/interfaces/appointment-repository.interface';
import { Appointment } from 'src/domain/appointment/model/appointment';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { AppointmentMapperFactory } from '../factories/appointment-mapper.factory';
import { AppointmentStatus } from 'src/domain/appointment/appointment-status.enum';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appointmentMapperFactory: AppointmentMapperFactory,
  ) {}
  async create({
    doctorId,
    patientId,
    description,
    status,
    date,
  }: Appointment): Promise<Appointment> {
    const saved = await this.prisma.appointmentEntity.create({
      data: {
        doctorId,
        patientId,
        description,
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

  async findById(appointmentId: number): Promise<Appointment> {
    const appointmentEntity = await this.prisma.appointmentEntity.findUnique({
      where: { id: appointmentId },
    });
    if (!appointmentEntity) return null;

    return this.appointmentMapperFactory.fromEntity(appointmentEntity);
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.prisma.appointmentEntity.findMany({
      include: {
        doctor: true,
        patient: true,
      },
    });

    return appointments.map((appointment) =>
      this.appointmentMapperFactory.fromEntity(appointment),
    );
  }

  async findAllByDoctorId(doctorId: number): Promise<Appointment[]> {
    const appointments = await this.prisma.appointmentEntity.findMany({
      where: { doctorId },
      include: { doctor: true, patient: true },
      orderBy: { date: 'desc' },
    });

    return appointments.map((appointment) =>
      this.appointmentMapperFactory.fromEntity(appointment),
    );
  }

  async findAllByPatientId(patientId: number): Promise<Appointment[]> {
    const appointments = await this.prisma.appointmentEntity.findMany({
      where: { patientId },
      include: { doctor: true, patient: true },
      orderBy: { date: 'desc' },
    });

    return appointments.map((appointment) =>
      this.appointmentMapperFactory.fromEntity(appointment),
    );
  }

  async update({ id, status }: Appointment): Promise<Appointment> {
    const updated = await this.prisma.appointmentEntity.update({
      where: { id },
      data: {
        status: AppointmentStatus[status],
      },
    });

    return this.appointmentMapperFactory.fromEntity(updated);
  }

  async delete(appointmentId: number): Promise<void> {
    await this.prisma.appointmentEntity.delete({
      where: { id: appointmentId },
    });
  }
}
