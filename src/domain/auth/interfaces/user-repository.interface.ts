import { User } from '../user';

export interface IUserRepository {
  create(user: User): Promise<User>;
  createDoctor(user: User): Promise<User>;
  createPatient(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(userId: number): Promise<User>;
}
