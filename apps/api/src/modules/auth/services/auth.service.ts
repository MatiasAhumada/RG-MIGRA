import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { UserService } from '@modules/users/services/user.service'
import { LoginDto } from '../dto/login.dto'
import { RegisterDto } from '../dto/register.dto'
import { TokenResponseDto } from '../dto/token-response.dto'
import { ApiErrorHandler } from '@exceptions/apiError.handler'
import { ClientErrorHandler } from '@exceptions/clientError.handler'
import { USER_ERRORS, AUTH_ERRORS } from '@constants/error.constant'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    const user = await this.userService.findByEmail(loginDto.email)

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)
    if (!isPasswordValid) {
      ApiErrorHandler.unauthorized(USER_ERRORS.INVALID_CREDENTIALS)
    }

    return this.generateTokens(user.id, user.email)
  }

  async register(registerDto: RegisterDto): Promise<TokenResponseDto> {
    const user = await this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
    })

    return this.generateTokens(user.id, user.email)
  }

  async refresh(refreshToken: string): Promise<TokenResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      })

      const user = await this.userService.findById(payload.sub)
      return this.generateTokens(user.id, user.email)
    } catch (error) {
      ClientErrorHandler.handle(error, AUTH_ERRORS.REFRESH_TOKEN_INVALID)
    }
  }

  private generateTokens(userId: string, email: string): TokenResponseDto {
    const payload = { sub: userId, email }

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async findByEmail(email: string) {
    return this.userService.findByEmail(email)
  }
}
