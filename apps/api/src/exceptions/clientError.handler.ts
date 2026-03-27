import { HttpStatus } from '@nestjs/common'
import { ApiException } from './api.exception'
import { ERROR_MESSAGES } from '@constants/error.constant'

export class ClientErrorHandler {
  static handle(error: unknown, defaultMessage = ERROR_MESSAGES.INTERNAL_ERROR): never {
    if (error instanceof ApiException) {
      throw error
    }

    throw new ApiException(defaultMessage, HttpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_ERROR')
  }
}
