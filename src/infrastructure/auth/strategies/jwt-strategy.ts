import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  JWT_SECRET,
  USER_REPOSITORY,
} from 'src/application/auth/auth.constants';
import { IUserRepository } from 'src/domain/auth/interfaces/user-repository.interface';
import { TokenPayload } from 'src/domain/auth/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(JWT_SECRET),
    });
  }
  async validate({ id }: TokenPayload) {
    const user = this.userRepository.findByIdPopulated(id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
