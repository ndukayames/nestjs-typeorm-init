import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { RestServiceController } from './rest-service.controller';
import { RestServiceService } from './rest-service.service';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [RestServiceController],
  providers: [RestServiceService],
})
export class RestServiceModule {}
