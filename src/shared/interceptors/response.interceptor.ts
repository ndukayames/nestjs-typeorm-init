import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      tap((response) => {
        this.logger.log(response);
      }),
      map((response) =>
        new ApiResponseDto()
          .withResult(response)
          .withStatusCode(statusCode)
          .withSuccess(true),
      ),
      catchError((err: HttpException) => {
        this.logger.error(err.getResponse());
        return throwError(() => err);
      }),
    );
  }
}
