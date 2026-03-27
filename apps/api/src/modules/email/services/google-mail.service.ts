import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import { EMAIL_ERRORS } from '@constants/error.constant'
import { ClientErrorHandler } from '@exceptions/clientError.handler'
import { SendEmailDto } from './email.service'

@Injectable()
export class GoogleMailService {
  private readonly transporter: nodemailer.Transporter

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASSWORD'),
      },
    })
  }

  async sendEmail(emailInput: SendEmailDto): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: emailInput.from || this.configService.get<string>('GMAIL_USER'),
        to: emailInput.to,
        subject: emailInput.subject,
        html: emailInput.html,
      })
    } catch (error) {
      ClientErrorHandler.handle(error, EMAIL_ERRORS.SEND_FAILED)
    }
  }
}
