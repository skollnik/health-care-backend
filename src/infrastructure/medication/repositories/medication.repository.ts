import { Injectable } from '@nestjs/common';
import { IMedicationRepository } from 'src/domain/medication/interfaces/medication-repository.interface';
import { Medication } from 'src/domain/medication/model/medication';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { MedicationMapperFactory } from '../factories/medication-mapper.factory';

@Injectable()
export class MedicationRepository implements IMedicationRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly medicationMapperFactory: MedicationMapperFactory,
  ) {}

  async create({ name, description }: Medication): Promise<Medication> {
    const saved = await this.prisma.medicationEntity.create({
      data: {
        name,
        description,
      },
    });
    
    return this.medicationMapperFactory.fromEntity(saved);
  }

  async findById(medicationId: number): Promise<Medication> {
    const medicationEntity = await this.prisma.medicationEntity.findUnique({
      where: { id: medicationId },
    });
    if (!medicationEntity) return null;

    return this.medicationMapperFactory.fromEntity(medicationEntity);
  }

  async findAll(): Promise<Medication[]> {
    const medications = await this.prisma.medicationEntity.findMany({});

    return medications.map((medication) =>
      this.medicationMapperFactory.fromEntity(medication),
    );
  }

  async update({ id, name, description }: Medication): Promise<Medication> {
    const updated = await this.prisma.medicationEntity.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return this.medicationMapperFactory.fromEntity(updated);
  }

  async delete(medicationId: number): Promise<void> {
    await this.prisma.medicationEntity.delete({
      where: { id: medicationId },
    });
  }
}
