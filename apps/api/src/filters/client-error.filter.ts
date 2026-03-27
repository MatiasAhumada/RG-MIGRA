import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { ERROR_MESSAGES } from '@constants/error.constant'

@Catch()
export class ClientErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const errorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse)
  }
}
