import { AggregateRoot } from '@nestjs/cqrs';
import { Doctor } from '../specialization/model/doctor';
import { Patient } from '../specialization/model/patient';
import { UserRole } from './role.enum';
import { AccountCreatedEvent } from './events/account-created.event';

export class User extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
    public readonly avatar: string | null,
    public readonly doctor: Doctor = null,
    public readonly patient: Patient = null,
  ) {
    super();
  }

  createAccount() {
    this.apply(new AccountCreatedEvent(this.email));
  }

  static create({
    id,
    email,
    password,
    role,
    avatar,
    doctor,
    patient,
  }: Partial<User>) {
    return new User(id, email, password, role, avatar, doctor, patient);
  }
}
