import { Global, Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { emailServiceFactory } from 'src/shared/utils/factory.provider';
import { EmailService } from './email.service';

@Global()
@Module({
  controllers: [],
  providers: [
    {
      provide: 'EMAIL_PROVIDER',
      useFactory: (configService: ConfigService) => {
        return emailServiceFactory(configService.get(''), configService);
      },
      inject: [ConfigService],
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}
