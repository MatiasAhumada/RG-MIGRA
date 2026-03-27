import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Resend } from 'resend'
import { EMAIL_ERRORS } from '@constants/error.constant'
import { ClientErrorHandler } from '@exceptions/clientError.handler'
import { EMAIL_CONSTANTS } from './email.constant'

export interface SendEmailDto {
  to: string
  subject: string
  html: string
  from?: string
}

@Injectable()
export class EmailService {
  private readonly resend: Resend

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY')
    this.resend = new Resend(apiKey)
  }

  async sendEmail(emailInput: SendEmailDto): Promise<void> {
    try {
      await this.resend.emails.send({
        from: emailInput.from || EMAIL_CONSTANTS.DEFAULT_FROM,
        to: emailInput.to,
        subject: emailInput.subject,
        html: emailInput.html,
      })
    } catch (error) {
      ClientErrorHandler.handle(error, EMAIL_ERRORS.SEND_FAILED)
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = `
      <h1>Welcome!</h1>
      <p>Hello ${name},</p>
      <p>Thank you for joining us. We're excited to have you on board!</p>
    `

    await this.sendEmail({
      to,
      subject: 'Welcome to our platform',
      html,
    })
  }
}
