import { Controller } from '@nestjs/common';
import { CacheService } from './cache-service.service';

@Controller('cache-service')
export class CacheServiceController {
  constructor(private readonly cacheServiceService: CacheService) {}
}
