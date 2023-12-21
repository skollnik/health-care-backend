import { UserRole } from 'src/domain/auth/role.enum';
import { DoctorSpecialty } from 'src/domain/specialization/doctor-specialty.enum';

export class RegisterDoctorCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: UserRole,
    public readonly specialty: DoctorSpecialty,
  ) {}
}
