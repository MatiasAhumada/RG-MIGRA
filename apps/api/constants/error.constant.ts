export const ERROR_MESSAGES = {
  NOT_FOUND: 'Resource not found',
  INVALID_DATA: 'Invalid data provided',
  DUPLICATE_ENTRY: 'Resource already exists',
  INTERNAL_ERROR: 'Internal server error',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  BAD_REQUEST: 'Bad request',
  VALIDATION_ERROR: 'Validation error',
} as const

export const USER_ERRORS = {
  NOT_FOUND: 'User not found',
  ALREADY_EXISTS: 'User already exists',
  EMAIL_EXISTS: 'Email already registered',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INACTIVE_ACCOUNT: 'Account is inactive',
} as const

export const AUTH_ERRORS = {
  INVALID_TOKEN: 'Invalid token',
  EXPIRED_TOKEN: 'Token expired',
  MISSING_TOKEN: 'Missing authentication token',
  REFRESH_TOKEN_INVALID: 'Invalid refresh token',
} as const

export const EMAIL_ERRORS = {
  SEND_FAILED: 'Failed to send email',
  INVALID_RECIPIENT: 'Invalid email recipient',
  TEMPLATE_NOT_FOUND: 'Email template not found',
} as const

export const CLOUDFLARE_ERRORS = {
  UPLOAD_FAILED: 'Failed to upload file',
  DELETE_FAILED: 'Failed to delete file',
  BUCKET_NOT_FOUND: 'Bucket not found',
} as const
