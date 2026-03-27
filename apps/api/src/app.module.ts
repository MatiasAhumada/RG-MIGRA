import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigurationModule } from './config/configuration.module'
import { HealthModule } from './common/health.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { EmailModule } from './modules/email/email.module'
import { CloudflareModule } from './modules/cloudflare/cloudflare.module'

@Module({
  imports: [
    ConfigurationModule,
    HealthModule,
    UsersModule,
    AuthModule,
    EmailModule,
    CloudflareModule,
  ],
})
export class AppModule {}
