import { Module } from '@nestjs/common';
import { BrasilApiService } from './brasil-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BrasilApiService],
  exports: [BrasilApiService],
})
export class BrasilApiModule {}
