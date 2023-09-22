import { Injectable } from '@nestjs/common';
import { IMedicalRecordRepository } from 'src/domain/medical-record/interfaces/medical-record-repository.interface';
import { MedicalRecord } from 'src/domain/medical-record/model/medical-record';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { MedicalRecordMapperFactory } from '../factories/medical-record-mapper.factory';

@Injectable()
export class MedicalRecordRepository implements IMedicalRecordRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapperFactory: MedicalRecordMapperFactory,
  ) {}

  async create({
    doctorId,
    patientId,
    appointmentId,
    diagnosis,
    medications,
  }: MedicalRecord): Promise<MedicalRecord> {
    const saved = await this.prisma.medicalRecordEntity.create({
      data: {
        doctorId,
        patientId,
        appointmentId,
        diagnosis,
        medications: { create: medications },
      },
    });
    return this.mapperFactory.fromEntity(saved);
  }
}
