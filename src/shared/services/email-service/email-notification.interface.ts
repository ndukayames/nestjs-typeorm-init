import { SendEmailAttachments } from './dto/send-email-attachment.dto';
import { SendEmail } from './dto/send-email.dto';

export interface EmailNotification {
  send(message: SendEmail): Promise<void>;
  sendWithAttachment(message: SendEmailAttachments): Promise<void>;
}
