import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';

import { UsecasesProxyModule } from 'src/infra/usecases-proxy/usecases-proxy.module';
import { BandwidthProfileController } from './bandwidthProfile/bandwidthProfile.controller';
import { BenefitController } from './benefit/benefit.controller';
import { CityController } from './city/city.controller';
import { PlainController } from './plain/plain.controller';

@Module({
  imports: [
    UsecasesProxyModule.register()
  ],
  controllers: [
    AuthController, 
    BandwidthProfileController,
    BenefitController,
    CityController,
    PlainController,
  ],
})
export class ControllersModule {}
