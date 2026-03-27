import { IsOptional, IsString, IsEmail, MinLength, IsBoolean } from 'class-validator'
import { AUTH_VALIDATION_MESSAGES } from '@constants/auth.constant'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEmail({}, { message: AUTH_VALIDATION_MESSAGES.INVALID_EMAIL })
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(8, { message: AUTH_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH })
  password?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
