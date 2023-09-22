import { Injectable } from '@nestjs/common';
import { IDoctorRepository } from 'src/domain/specialization/interfaces/doctor-repository.interface';
import { Doctor } from 'src/domain/specialization/model/doctor';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { DoctorMapperFactory } from '../factories/doctor-mapper.factory';

@Injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly doctorMapperFactory: DoctorMapperFactory,
  ) {}

  async findById(id: number): Promise<Doctor> {
    const doctor = await this.prisma.doctorEntity.findUnique({
      where: { id },
    });
    return this.doctorMapperFactory.fromEntity(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    const doctors = await this.prisma.doctorEntity.findMany({});
    return doctors.map((doctor) => this.doctorMapperFactory.fromEntity(doctor));
  }
}
