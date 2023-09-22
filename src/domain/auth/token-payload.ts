import { UserRole } from './role.enum';

export type TokenPayload = {
  id: number;
  email: string;
  role: UserRole;
};
