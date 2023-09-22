import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../../../domain/auth/user';
import { HASHING_SERVICE, USER_REPOSITORY } from '../../auth.constants';
import { IUserRepository } from 'src/domain/auth/interfaces/user-repository.interface';
import { IHashingService } from '../../interfaces/hashing-service.interface';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASHING_SERVICE) private readonly hashingService: IHashingService,
    private readonly eventBus: EventPublisher,
  ) {}

  async execute({ email, password, role }: CreateUserCommand): Promise<any> {
    const hashedPassword = await this.hashingService.hashPassword(password);
    const user = User.create({ email, password: hashedPassword, role });
    const createdUser = this.eventBus.mergeObjectContext(
      await this.userRepository.create(user),
    );
    createdUser.createAccount();
    createdUser.commit();
    return createdUser;
  }
}
