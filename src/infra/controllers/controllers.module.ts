import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';

import { UsecasesProxyModule } from 'src/infra/usecases-proxy/usecases-proxy.module';
import { BandwidthProfileController } from './bandwidthProfile/bandwidthProfile.controller';
import { BenefitController } from './benefit/benefit.controller';
import { CityController } from './city/city.controller';
import { PlainController } from './plain/plain.controller';
import { PlainBenefitController } from './PlainBenefit/PlainBenefit.controller';
import { PlainLocationController } from './PlainLocation/PlainLocation.controller';
import { ShopController } from './shop/shop.controller';
import { BasicInformationController } from './basicInformation/basic-information.controller';
import { VacancyController } from './vacancy/vacancy.controller';

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
    PlainBenefitController,
    PlainLocationController,
    ShopController,
    BasicInformationController,
    VacancyController
  ],
})
export class ControllersModule {}
