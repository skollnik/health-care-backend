import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/auth/interfaces/user-repository.interface';
import { User } from 'src/domain/auth/user';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntityRole } from '@prisma/client';
import { UserEntityMapperFactory } from '../factories/user-mapper.factory';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapperFactory: UserEntityMapperFactory,
  ) {}

  async create(user: User): Promise<User> {
    const userEntity = await this.prisma.userEntity.create({
      data: {
        email: user.email,
        password: user.password,
        role: user.role as UserEntityRole,
      },
    });

    return this.mapperFactory.fromEntity(userEntity);
  }

  async createDoctor({ email, password, role, doctor }): Promise<User> {
    const user = await this.prisma.userEntity.create({
      data: {
        email,
        password,
        role,
        doctor: {
          create: {
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            specialty: doctor.specialty,
          },
        },
      },
    });

    return this.mapperFactory.fromEntity(user);
  }

  async createPatient({ email, password, role, patient }): Promise<User> {
    const user = await this.prisma.userEntity.create({
      data: {
        email,
        password,
        role,
        patient: {
          create: {
            firstName: patient.firstName,
            lastName: patient.lastName,
            gender: patient.gender,
          },
        },
      },
    });

    return this.mapperFactory.fromEntity(user);
  }

  async findByEmail(email: string): Promise<User> {
    const userEntity = await this.prisma.userEntity.findUnique({
      where: { email },
    });
    if (!userEntity) return null;

    return this.mapperFactory.fromEntity(userEntity);
  }

  async findById(userId: number): Promise<User> {
    const userEntity = await this.prisma.userEntity.findUnique({
      where: { id: userId },
    });
    if (!userEntity) return null;
    
    return this.mapperFactory.fromEntity(userEntity);
  }

  async findByIdPopulated(userId: number): Promise<User> {
    const userEntity = await this.prisma.userEntity.findUnique({
      where: { id: userId },
      include: {
        doctor: true,
        patient: true,
      },
    });

    return this.mapperFactory.fromEntity(userEntity);
  }
}
