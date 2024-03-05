import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';

import { UsecasesProxyModule } from 'src/infra/usecases-proxy/usecases-proxy.module';
import { BandwidthProfileController } from './bandwidthProfile/bandwidthProfile.controller';
import { BenefitController } from './benefits/benefits.controller';

@Module({
  imports: [
    UsecasesProxyModule.register()
  ],
  controllers: [
    AuthController, 
    BandwidthProfileController,
    BenefitController
  ],
})
export class ControllersModule {}
