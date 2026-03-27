import { HttpStatus } from '@nestjs/common'
import { ApiException } from './api.exception'

export class NotFoundException extends ApiException {
  constructor(message = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND, 'NOT_FOUND')
  }
}

export class BadRequestException extends ApiException {
  constructor(message = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST, 'BAD_REQUEST')
  }
}

export class ConflictException extends ApiException {
  constructor(message = 'Resource already exists') {
    super(message, HttpStatus.CONFLICT, 'CONFLICT')
  }
}

export class UnauthorizedException extends ApiException {
  constructor(message = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED')
  }
}

export class ForbiddenException extends ApiException {
  constructor(message = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN, 'FORBIDDEN')
  }
}

export class InternalServerErrorException extends ApiException {
  constructor(message = 'Internal server error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, 'INTERNAL_ERROR')
  }
}
