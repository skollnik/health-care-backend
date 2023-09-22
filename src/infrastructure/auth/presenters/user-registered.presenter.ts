import { User } from 'src/domain/auth/user';

export class UserRegisteredPresenter {
  public readonly id: number;
  public readonly email: string;
  constructor({ id, email }: User) {
    this.id = id;
    this.email = email;
  }
}
