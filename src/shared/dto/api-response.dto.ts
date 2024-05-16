export class ApiResponseDto<T> {
  success: boolean;
  result: T;
  statusCode: number;

  withSuccess(value: boolean) {
    this.success = value;
    return this;
  }

  withResult(data: T) {
    this.result = data;
    return this;
  }

  withStatusCode(code: number) {
    this.statusCode = code;
    return this;
  }
}
