import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common'
import { Public } from '@common/decorators/public.decorator'
import { AuthService } from '../services/auth.service'
import { LoginDto } from '../dto/login.dto'
import { RegisterDto } from '../dto/register.dto'
import { TokenResponseDto } from '../dto/token-response.dto'

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
    return this.authService.login(loginDto)
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<TokenResponseDto> {
    return this.authService.register(registerDto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string): Promise<TokenResponseDto> {
    return this.authService.refresh(refreshToken)
  }
}
