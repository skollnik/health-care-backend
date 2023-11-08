import { UserRole } from 'src/domain/auth/role.enum';
import { User } from 'src/domain/auth/user';

export class ProfilePresenter {
  public id: number;
  public email: string;
  public firstName: string;
  public lastName: string;
  public role: string;
  constructor({ id, email, role, doctor, patient }: User) {
    this.id = id;
    this.email = email;
    this.role = role.toString();
    if (role === UserRole.ADMINISTRATOR)
      this.setFirstNameAndLastName('admin', 'admin');
    if (role === UserRole.DOCTOR)
      this.setFirstNameAndLastName(doctor.firstName, doctor.lastName);
    if (role === UserRole.PATIENT)
      this.setFirstNameAndLastName(patient.firstName, patient.lastName);
  }

  private setFirstNameAndLastName(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
