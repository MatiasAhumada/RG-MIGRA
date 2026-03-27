import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { UserService } from '@modules/users/services/user.service'
import { UserEntity } from '@modules/users/entities/user.entity'
import { ApiErrorHandler } from '@exceptions/apiError.handler'
import { USER_ERRORS } from '@constants/error.constant'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: { sub: string; email: string }): Promise<UserEntity> {
    const user = await this.userService.findById(payload.sub)
    if (!user) {
      ApiErrorHandler.unauthorized(USER_ERRORS.NOT_FOUND)
    }
    return user
  }
}
