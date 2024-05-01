import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseDto } from '../dto/api-response.dto';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionHandler.name);
  catch(exception: any, host: ArgumentsHost) {
    this.logger.debug(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      (exception.response && exception.response.status) ||
      exception.response?.statusCode ||
      500;
    const message =
      (exception.response &&
        (exception.response.data?.message || exception.response.message)) ||
      exception.message ||
      'Internal server error';

    const errorResponse: ApiResponseDto<any> = {
      success: false,
      statusCode: status || 500,
      result: message,
    };

    response.status(status).json(errorResponse);
  }
}
