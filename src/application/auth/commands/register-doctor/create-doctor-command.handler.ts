import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterDoctorCommand } from './create-doctor.command';
import { USER_REPOSITORY, HASHING_SERVICE } from '../../auth.constants';
import { IUserRepository } from 'src/domain/auth/interfaces/user-repository.interface';
import { IHashingService } from '../../interfaces/hashing-service.interface';
import { User } from 'src/domain/auth/user';
import { Doctor } from 'src/domain/specialization/model/doctor';
import { EmailAlreadyTakenException } from 'src/domain/auth/exceptions/email-already-taken.exception';

@CommandHandler(RegisterDoctorCommand)
export class RegisterDoctorCommandHandler
  implements ICommandHandler<RegisterDoctorCommand>
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
    specialty,
  }: RegisterDoctorCommand): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) throw new EmailAlreadyTakenException();
    const hashedPassword = await this.hashingService.hashPassword(password);
    const doctor = Doctor.create({ firstName, lastName, specialty });
    const user: User = User.create({
      email,
      password: hashedPassword,
      role,
      doctor,
    });

    const createdUser = this.eventBus.mergeObjectContext(
      await this.userRepository.createDoctor(user),
    );

    createdUser.createAccount();
    createdUser.commit();
    return createdUser;
  }
}
