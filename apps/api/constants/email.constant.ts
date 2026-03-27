export const EMAIL_DEFAULTS = {
  FROM_ADDRESS: 'onboarding@resend.dev',
} as const

export const EMAIL_VALIDATION_MESSAGES = {
  INVALID_RECIPIENT: 'Invalid email recipient',
  SEND_FAILED: 'Failed to send email',
  TEMPLATE_NOT_FOUND: 'Email template not found',
  SUBJECT_REQUIRED: 'Email subject is required',
  BODY_REQUIRED: 'Email body is required',
} as const
