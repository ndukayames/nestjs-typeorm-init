import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RequesInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequesInterceptor.name);
  private readonly sensitiveBodyProperties = [
    'password',
    'phoneNumber',
    'email',
  ];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const method = context.getArgs()[0]?.method;

    const req = context.switchToHttp().getRequest<Request>();
    const { url, headers, body } = req;
    const { statusCode } = context.switchToHttp().getResponse();

    const request = {
      method,
      url,
      path: req.path,
      params: req.params,
      statusCode: statusCode || 500,
      headers,
      body: this.maskSensitiveData(body),
    };

    this.logger.log(request);

    return next.handle();
  }

  private maskSensitiveData(data: any): any {
    if (typeof data === 'object') {
      for (const key of Object.keys(data)) {
        if (this.sensitiveBodyProperties.includes(key)) {
          data[key] = '[MASKED]';
        } else {
          data[key] = this.maskSensitiveData(data[key]);
        }
      }
    }
    return data;
  }
}
