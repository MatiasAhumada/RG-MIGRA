export const DATABASE_DEFAULTS = {
  PORT: 5432,
} as const

export const DATABASE_VALIDATION_MESSAGES = {
  CONNECTION_FAILED: 'Database connection failed',
  QUERY_FAILED: 'Database query failed',
  TRANSACTION_FAILED: 'Database transaction failed',
} as const
