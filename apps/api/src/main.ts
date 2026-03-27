import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { ValidationPipe } from '@filters/validation.pipe'
import { ApiExceptionFilter } from '@filters/api-exception.filter'
import { ApiErrorFilter } from '@filters/api-error.filter'
import { ClientErrorFilter } from '@filters/client-error.filter'
import { LoggingInterceptor } from '@interceptors/logging.interceptor'
import { TransformInterceptor } from '@interceptors/transform.interceptor'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { AppModule } from './app.module'
import { APP_CONSTANTS } from '@constants/app.constant'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Bootstrap')

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT') || APP_CONSTANTS.PORT

  app.setGlobalPrefix(APP_CONSTANTS.PREFIX)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.useGlobalFilters(new ApiExceptionFilter())
  app.useGlobalFilters(new ApiErrorFilter())
  app.useGlobalFilters(new ClientErrorFilter())

  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())

  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))

  const config = new DocumentBuilder()
    .setTitle('Generic Nest Prisma API')
    .setDescription('Production-ready NestJS + Prisma API template')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(`${APP_CONSTANTS.PREFIX}/docs`, app, document)

  app.enableCors()

  await app.listen(port)
  logger.log(`Application is running on: http://localhost:${port}/${APP_CONSTANTS.PREFIX}`)
}

bootstrap()
