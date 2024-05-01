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
      body,
    };

    this.logger.log(request);

    return next.handle();
  }
}
