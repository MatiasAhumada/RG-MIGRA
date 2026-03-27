import { Module, Global } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { validateEnv } from '../../config/env.config'
import { databaseConfig } from '../../config/database.config'
import { jwtConfig } from '../../config/jwt.config'
import { emailConfig } from '../../config/email.config'
import { cloudflareConfig } from '../../config/cloudflare.config'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validate: validateEnv,
      load: [databaseConfig, jwtConfig, emailConfig, cloudflareConfig],
    }),
  ],
})
export class ConfigurationModule {}
