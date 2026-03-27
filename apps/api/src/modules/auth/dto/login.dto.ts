import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator'
import { AUTH_VALIDATION_MESSAGES } from '@constants/auth.constant'

export class LoginDto {
  @IsNotEmpty({ message: AUTH_VALIDATION_MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: AUTH_VALIDATION_MESSAGES.INVALID_EMAIL })
  email: string

  @IsNotEmpty({ message: AUTH_VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  @IsString()
  @MinLength(8, { message: AUTH_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH })
  password: string
}
