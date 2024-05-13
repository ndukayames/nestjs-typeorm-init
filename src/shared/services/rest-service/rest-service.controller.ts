import { Controller } from '@nestjs/common';
import { RestServiceService } from './rest-service.service';

@Controller()
export class RestServiceController {
  constructor(private readonly restServiceService: RestServiceService) {}
}
