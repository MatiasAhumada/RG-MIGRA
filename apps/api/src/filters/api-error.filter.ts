import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { AxiosError } from 'axios'
import { ERROR_MESSAGES } from '@constants/error.constant'

@Catch(AxiosError)
export class ApiErrorFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR

    const errorResponse = {
      statusCode: status,
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response.status(status).json(errorResponse)
  }
}
