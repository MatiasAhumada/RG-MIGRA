import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { ApiException } from '@exceptions/api.exception'

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()

    const errorResponse = {
      statusCode: status,
      message: (exceptionResponse as { message: string }).message,
      code: (exceptionResponse as { code: string }).code,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response.status(status).json(errorResponse)
  }
}
