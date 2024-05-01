import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DuplicateResourceException } from './shared/exceptions/duplicate-resource.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  getHelloError(): string {
    throw new DuplicateResourceException('235445454');
  }
}
