import { Global, Module } from '@nestjs/common';
import { CacheServiceController } from './cache-service.controller';
import { CacheService } from './cache-service.service';

@Global()
@Module({
  controllers: [CacheServiceController],
  providers: [CacheService],
})
export class CacheServiceModule {}
