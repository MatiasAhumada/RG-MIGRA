import { HttpStatus } from '@nestjs/common'
import { ApiException } from './api.exception'
import { ERROR_MESSAGES } from '@constants/error.constant'

export class ApiErrorHandler {
  static notFound(message = ERROR_MESSAGES.NOT_FOUND): never {
    throw new ApiException(message, HttpStatus.NOT_FOUND, 'NOT_FOUND')
  }

  static badRequest(message = ERROR_MESSAGES.BAD_REQUEST): never {
    throw new ApiException(message, HttpStatus.BAD_REQUEST, 'BAD_REQUEST')
  }

  static unauthorized(message = ERROR_MESSAGES.UNAUTHORIZED): never {
    throw new ApiException(message, HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED')
  }

  static forbidden(message = ERROR_MESSAGES.FORBIDDEN): never {
    throw new ApiException(message, HttpStatus.FORBIDDEN, 'FORBIDDEN')
  }

  static conflict(message = ERROR_MESSAGES.DUPLICATE_ENTRY): never {
    throw new ApiException(message, HttpStatus.CONFLICT, 'CONFLICT')
  }

  static internal(message = ERROR_MESSAGES.INTERNAL_ERROR): never {
    throw new ApiException(message, HttpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_ERROR')
  }

  static unprocessableEntity(message = ERROR_MESSAGES.VALIDATION_ERROR): never {
    throw new ApiException(message, HttpStatus.UNPROCESSABLE_ENTITY, 'UNPROCESSABLE_ENTITY')
  }
}
