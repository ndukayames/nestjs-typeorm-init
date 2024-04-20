import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import * as nodemailer from 'nodemailer';
import { SendEmailAttachments } from '../dto/send-email-attachment.dto';
import { SendEmail } from '../dto/send-email.dto';
import { EmailNotification } from '../email-notification.interface';

@Injectable()
export class Mailer implements EmailNotification {
  private transporter: nodemailer.Transporter;
  private fromAddress: string;
  private logger = new Logger(Mailer.name);
  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('SMTP_HOST'),
      port: configService.get('SMTP_PORT'),
      secure: true,
      auth: {
        user: configService.get('SMTP_USERNAME'),
        pass: configService.get('SMTP_PASSWORD'),
      },

      tls: {
        rejectUnauthorized: true,
      },
    });
    this.transporter
      .verify()
      .then(() =>
        Logger.debug(
          `Connected to ${configService.get('EMAIL_PROVIDER')} email server`,
        ),
      )
      .catch((err) =>
        Logger.error(
          'Unable to connect to email server. Make sure you have configured the SMTP options in .env',
          err,
        ),
      );
    this.fromAddress = configService.get('EMAIL_FROM');
  }

  async send(dto: SendEmail): Promise<void> {
    const mailOptions = {
      from: this.fromAddress,
      to: dto.to,
      subject: dto.subject,
      text: dto.body,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendWithAttachment(message: SendEmailAttachments): Promise<void> {
    const { to, subject, body, attachments } = message;

    if (!attachments || attachments.length === 0) {
      throw new Error('No attachments provided for email');
    }

    const mailOptions = {
      from: message.from || this.fromAddress,
      to,
      subject,
      text: body,
      attachments: message.attachments.map((attachment) => ({
        filename: attachment.originalname, // Use original filename from Multer
        content: createReadStream(attachment.path), // Stream the file content
        contentType: attachment.mimetype, // Use mimetype from Multer
      })),
    };

    await this.transporter.sendMail(mailOptions);
  }
}
