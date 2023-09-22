import { UserRole } from 'src/domain/auth/role.enum';

export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
  ) {}
}
