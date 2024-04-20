import { EmailNotification } from '../services/email/email-notification.interface';
import { Mailer } from '../services/email/providers/mailer.service';
import { S3FileUploadProvider } from '../services/file-upload-service/providers/s3-file-upload.provider';

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

export function fileUploadProviderFactory(
  provider: string | 'aws',
  configService: any,
): any {
  if (provider != null && provider.toLocaleLowerCase() === 'aws') {
    return new S3FileUploadProvider(configService);
  }
}
