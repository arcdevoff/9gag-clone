import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      try {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
          secret: this.configService.get('jwt').refreshSecret,
        });

        req.user = { id: payload.id };
        return true;
      } catch (err) {
        console.warn('Invalid refresh token:', err.message);
      }
    }

    return true;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      return null;
    }

    return user ?? null;
  }
}
