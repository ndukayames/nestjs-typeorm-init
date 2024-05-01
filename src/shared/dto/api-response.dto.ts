export class ApiResponseDto<T> {
  success: boolean;
  result: T;
  statusCode: number;

  constructor(success: boolean, result: T, statusCode: number) {
    this.success = success;
    this.result = result;
    this.statusCode = statusCode;
  }
}
