import { HttpException } from '@nestjs/common';
import { ApiResponseDto } from '../dto/api-response.dto';

export class ExceptionResponseException extends HttpException {
  constructor(response: ApiResponseDto<any>) {
    super(response, response.statusCode);
  }
}
