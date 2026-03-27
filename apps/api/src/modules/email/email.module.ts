import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EmailService } from './services/email.service'
import { GoogleMailService } from './services/google-mail.service'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [EmailService, GoogleMailService],
  exports: [EmailService, GoogleMailService],
})
export class EmailModule {}
