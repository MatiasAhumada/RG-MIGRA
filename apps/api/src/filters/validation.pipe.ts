import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  HttpStatus,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ApiException } from '@exceptions/api.exception'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (!value || Object(value) !== value) {
      return value
    }

    const { metatype } = metadata

    if (!metatype) {
      return value
    }

    const object = plainToInstance(metatype, value)
    const errors = await validate(object)

    if (errors.length > 0) {
      const message = this.formatErrors(errors)
      throw new ApiException(message, HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR')
    }

    return object
  }

  private formatErrors(errors: import('class-validator').ValidationError[]): string {
    return errors
      .map((error) => {
        const constraints = error.constraints
        if (constraints) {
          return Object.values(constraints).join(', ')
        }
        return ''
      })
      .filter(Boolean)
      .join('; ')
  }
}
