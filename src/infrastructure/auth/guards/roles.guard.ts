import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/domain/auth/role.enum';
import { User } from 'src/domain/auth/user';
import { ROLES_KEY } from '../decorators/role.decorator';

export type ReqWithUser = {
  user: User;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const { user }: ReqWithUser = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
