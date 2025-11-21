import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailOptions } from 'src/@types/mail';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject, text, html }: SendMailOptions) {
    try {
      const result = await this.mailerService.sendMail({
        to,
        subject,
        text,
        html,
      });
      console.log('✅ Email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('❌ Error sending email:', error);
      throw error;
    }
  }
}
