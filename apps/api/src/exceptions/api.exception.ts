import { HttpException, HttpStatus } from '@nestjs/common'

export class ApiException extends HttpException {
  constructor(message: string, status: HttpStatus, private readonly code: string) {
    super({ message, code }, status)
  }

  getCode(): string {
    return this.code
  }
}
