export const CLOUDFLARE_CONSTANTS = {
  SIGNED_URL_EXPIRY: 3600,
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  DEFAULT_REGION: 'auto',
} as const

export const CLOUDFLARE_VALIDATION_MESSAGES = {
  FILE_REQUIRED: 'File is required',
  FILE_TOO_LARGE: 'File size exceeds limit',
  INVALID_FILE_TYPE: 'Invalid file type',
  UPLOAD_FAILED: 'Failed to upload file',
  DELETE_FAILED: 'Failed to delete file',
} as const
