import {
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseFilters,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterDoctorDto } from './dtos/register-doctor.dto';
import { RegisterDoctorCommand } from 'src/application/auth/commands/register-doctor/create-doctor.command';
import { UserRole } from 'src/domain/auth/role.enum';
import { UserRegisteredPresenter } from './presenters/user-registered.presenter';
import { RegisterPatientDto } from './dtos/register-patient.dto';
import { RegisterPatientCommand } from 'src/application/auth/commands/register-patient/create-patient.command';
import { LoginDto } from './dtos/login.dto';
import { LoginCommand } from 'src/application/auth/commands/login/login.command';
import { LoggedInPresenter } from './presenters/logged-in.presenter';
import { DomainErrorFilter } from '../error-handling/domain-error.filter';
import { Roles } from './decorators/role.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { ReqWithUser, RolesGuard } from './guards/roles.guard';
import { ProfilePresenter } from './presenters/profile.presenter';

@Controller('auth')
@UseFilters(DomainErrorFilter)
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() { email, password }: LoginDto) {
    const token = await this.commandBus.execute(
      new LoginCommand(email, password),
    );
    return new LoggedInPresenter(token);
  }

  @Post('/register/doctor')
  async registerDoctor(
    @Body()
    { email, password, firstName, lastName, specialty }: RegisterDoctorDto,
  ) {
    const user = await this.commandBus.execute(
      new RegisterDoctorCommand(
        email,
        password,
        firstName,
        lastName,
        UserRole.DOCTOR,
        specialty,
      ),
    );
    return new UserRegisteredPresenter(user);
  }

  @Post('/register/patient')
  async registerPatient(
    @Body()
    { email, password, firstName, lastName, gender }: RegisterPatientDto,
  ) {
    const user = await this.commandBus.execute(
      new RegisterPatientCommand(
        email,
        password,
        firstName,
        lastName,
        UserRole.PATIENT,
        gender,
      ),
    );
    return new UserRegisteredPresenter(user);
  }

  @Roles(UserRole.ADMINISTRATOR, UserRole.DOCTOR, UserRole.PATIENT)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/me')
  async getProfile(@Req() { user }: ReqWithUser) {
    return new ProfilePresenter(user);
  }
}
