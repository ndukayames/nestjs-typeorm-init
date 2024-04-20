import { Module } from '@nestjs/common';
import { CacheServiceController } from './cache-service.controller';
import { CacheService } from './cache-service.service';

@Module({
  controllers: [CacheServiceController],
  providers: [CacheService],
})
export class CacheServiceModule {}
