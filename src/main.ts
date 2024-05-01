import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app.module';
import { GlobalExceptionHandler } from './shared/exceptions/global-exception.filter';
import { RequesInterceptor } from './shared/interceptors/request.interceptors';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // file on daily rotation (error only)
        new transports.DailyRotateFile({
          filename: 'logs/frontters-dashboard-errors-log-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '20m',
          level: 'error',
        }),
        // same for all levels
        new transports.DailyRotateFile({
          filename: `logs/frontters-dashboard-combined-log-%DATE%.log`,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '30d',
        }),
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.json(),
          ),
        }),
      ],
    }),
  });
  app.enableCors();
  app.use(compression());

  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new RequesInterceptor(), new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionHandler());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
