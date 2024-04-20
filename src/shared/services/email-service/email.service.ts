import { Inject } from '@nestjs/common';
import { SendEmailAttachments } from './dto/send-email-attachment.dto';
import { SendEmail } from './dto/send-email.dto';
import { EmailNotification } from './email-notification.interface';

export class EmailService implements EmailNotification {
  constructor(
    @Inject('EMAIL_PROVIDER') private emailProvider: EmailNotification,
  ) {}

  async send(message: SendEmail): Promise<void> {
    return this.emailProvider.send(message);
  }

  async sendWithAttachment(message: SendEmailAttachments): Promise<void> {
    return this.emailProvider.sendWithAttachment(message);
  }
}
