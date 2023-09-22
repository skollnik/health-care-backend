import { UserRole } from 'src/domain/auth/role.enum';
import { Gender } from 'src/domain/specialization/gender.enum';

export class RegisterPatientCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: UserRole,
    public readonly gender: Gender,
  ) {}
}
