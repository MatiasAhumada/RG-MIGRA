export const APP_CONSTANTS = {
  PORT: 3000,
  PREFIX: 'api',
  VERSION: 'v1',
} as const

export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

export const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const
