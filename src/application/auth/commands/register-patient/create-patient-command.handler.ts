import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { USER_REPOSITORY, HASHING_SERVICE } from '../../auth.constants';
import { IUserRepository } from 'src/domain/auth/interfaces/user-repository.interface';
import { IHashingService } from '../../interfaces/hashing-service.interface';
import { User } from 'src/domain/auth/user';
import { RegisterPatientCommand } from './create-patient.command';
import { Patient } from 'src/domain/specialization/model/patient';
import { EmailAlreadyTakenException } from 'src/domain/auth/exceptions/email-already-taken.exception';

@CommandHandler(RegisterPatientCommand)
export class RegisterPatientCommandHandler
  implements ICommandHandler<RegisterPatientCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASHING_SERVICE) private readonly hashingService: IHashingService,
    private readonly eventBus: EventPublisher,
  ) {}
  async execute({
    email,
    password,
    role,
    firstName,
    lastName,
    gender,
  }: RegisterPatientCommand): Promise<User> {
    const userExist = this.userRepository.findByEmail(email);
    if (userExist) throw new EmailAlreadyTakenException();
    const hashedPassword = await this.hashingService.hashPassword(password);
    const patient = Patient.create({ firstName, lastName, gender });
    const user: User = User.create({
      email,
      password: hashedPassword,
      role,
      patient,
    });

    const createdUser = this.eventBus.mergeObjectContext(
      await this.userRepository.createPatient(user),
    );

    createdUser.commit();
    return createdUser;
  }
}
