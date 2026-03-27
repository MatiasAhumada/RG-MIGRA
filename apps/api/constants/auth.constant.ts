export const BCRYPT_CONSTANTS = {
  SALT_ROUNDS: 10,
} as const

export const TOKEN_CONSTANTS = {
  ACCESS_EXPIRATION: '1h',
  REFRESH_EXPIRATION: '7d',
} as const

export const AUTH_VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  INVALID_EMAIL: 'Invalid email format',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters',
  NAME_REQUIRED: 'Name is required',
  INVALID_CREDENTIALS: 'Invalid credentials',
  REFRESH_TOKEN_REQUIRED: 'Refresh token is required',
} as const
