import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import {
  HASHING_SERVICE,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  JWT_SERVICE,
  USER_REPOSITORY,
} from 'src/application/auth/auth.constants';
import { HashingService } from './services/hashing.service';
import { JWTService } from './services/jwt.service';
import { AuthController } from './auth.controller';
import { CreateUserCommandHandler } from 'src/application/auth/commands/create-user/create-user-command.handler';
import { RegisterDoctorCommandHandler } from 'src/application/auth/commands/register-doctor/create-doctor-command.handler';
import { UserRepository } from './repositories/user.repository';
import { UserEntityMapperFactory } from './factories/user-mapper.factory';
import { PrismaModule } from '../prisma/prisma.module';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { RegisterPatientCommandHandler } from 'src/application/auth/commands/register-patient/create-patient-command.handler';
import { LoginCommandHandler } from 'src/application/auth/commands/login/login-command.handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountCreatedEventHandler } from 'src/application/auth/events/account-created-event.handler';
import { SharedModule } from '../shared/shared.module';
import { JwtStrategy } from './strategies/jwt-strategy';

const commandHandlers = [
  CreateUserCommandHandler,
  RegisterDoctorCommandHandler,
  RegisterPatientCommandHandler,
  LoginCommandHandler,
];

const eventHandlers = [AccountCreatedEventHandler];

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: HASHING_SERVICE,
    useClass: HashingService,
  },
  {
    provide: JWT_SERVICE,
    useClass: JWTService,
  },
  JwtStrategy,
  UserEntityMapperFactory,
];

@Module({
  imports: [
    PrismaModule,
    CqrsModule,
    ConfigModule,
    SharedModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(JWT_EXPIRES_IN),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [...commandHandlers, ...eventHandlers, ...providers],
  exports: [USER_REPOSITORY, UserEntityMapperFactory],
})
export class AuthModule {}
