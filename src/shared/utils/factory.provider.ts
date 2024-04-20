import { EmailNotification } from '../services/email/email-notification.interface';
import { Mailer } from '../services/email/providers/mailer.service';

export function emailServiceFactory(
  provider: string | 'postmark',
  configService: any,
): EmailNotification {
  if (provider && provider.toLowerCase() === 'some other provider') {
    // initialize provider impl
  } else {
    return new Mailer(configService);
  }
}
