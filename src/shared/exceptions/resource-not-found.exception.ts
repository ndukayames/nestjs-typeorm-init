import { NotFoundException } from '@nestjs/common';

export class ResourceNotFoundException extends NotFoundException {
  constructor(
    message?: string,
    private resource?: string,
    private resourceValue?: string,
  ) {
    let errMsg = 'Resource Not Found Exception';
    if (resource && resourceValue) {
      errMsg = `Resource ${resource} with value ${resourceValue} doesn't exists`;
    } else {
      errMsg = message;
    }
    super(errMsg);
  }
}
