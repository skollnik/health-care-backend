import { Injectable } from '@nestjs/common';
import { IPatientRepository } from 'src/domain/specialization/interfaces/patient-repository.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PatientMapperFactory } from '../factories/patient-mapper.factory';
import { Patient } from 'src/domain/specialization/model/patient';

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientMapperFactory: PatientMapperFactory,
  ) {}

  async findById(id: number): Promise<Patient> {
    const patient = await this.prisma.patientEntity.findUnique({
      where: { id },
      include: { user: true },
    });

    return this.patientMapperFactory.fromEntity(patient);
  }

  async findAll(): Promise<Patient[]> {
    const patients = await this.prisma.patientEntity.findMany({});

    return patients.map((patient) =>
      this.patientMapperFactory.fromEntity(patient),
    );
  }
}
