import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecases-proxy';

import { RepositoriesModule } from 'src/infra/repositories/repositories.module';

import { JwtTokenService } from 'src/infra/services/jwt/jwt.service';
import { LoggerService } from 'src/infra/logger/logger.service';
import { EnvironmentConfigService } from 'src/infra/config/environment-config/environment-config.service';
import { BcryptService } from 'src/infra/services/bcrypt/bcrypt.service';
import { LoginUseCases } from 'src/useCases/auth/login.usecases';
import { LoggerModule } from 'src/infra/logger/logger.module';

import { BcryptModule } from 'src/infra/services/bcrypt/bcrypt.module';
import { EnvironmentConfigModule } from 'src/infra/config/environment-config/environment-config.module';
import { ExceptionsModule } from 'src/infra/exceptions/exceptions.module';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
import { JwtModule } from 'src/infra/services/jwt/jwt.module';
import { DatabaseUserRepository } from '@infra/repositories/prisma/user.repository';
import { PrismaBandwidthProfileRepository } from '@infra/repositories/prisma/prismaBandwidthProfileRepository';
import { Create_BandwidthProfile } from '@useCases/bandwidth-profile/new.usecases';
import { Get_BandwidthProfile } from '@useCases/bandwidth-profile/search.usecases';
import { Disable_BandwidthProfile } from '@useCases/bandwidth-profile/disabled.usecases';
import { Create_Benefits } from '@useCases/benefits/create.usecases';
import { PrismaBenefitsRepository } from '@infra/repositories/prisma/prismaBenefitsRepository';
import { Get_Benefits } from '@useCases/benefits/search.usecases';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';


  // BandWidth Profile
  static NEW_BANDWIDTH_PROFILE_USECASES_PROXY = "NewBandwidthProfileUseCasesProxy"
  static SEARCH_BANDWIDTH_PROFILE_USECASES_PROXY = "SearchBandwidthProfileUseCasesProxy"
  static DISABLE_BANDWIDTH_PROFILE_USECASES_PROXY = "DisableBandwidthProfileUseCasesProxy"

  // BandWidth Profile
  static NEW_BENEFITS_USECASES_PROXY = "NewBenefitsUseCasesProxy"
  static SEARCH_BENEFITS_USECASES_PROXY = "SearchBenefitsUseCasesProxy"



  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,

            
            PrismaBandwidthProfileRepository,

            PrismaBenefitsRepository,
            
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        //BandWidhProfile Acctions Crud start =======================================================
        {
          inject: [PrismaBandwidthProfileRepository],
          provide: UsecasesProxyModule.NEW_BANDWIDTH_PROFILE_USECASES_PROXY,
          useFactory: (BandwidthProfileRepository: PrismaBandwidthProfileRepository) => 
          new UseCaseProxy(new Create_BandwidthProfile(BandwidthProfileRepository)),
        },

        {
          inject: [PrismaBandwidthProfileRepository],
          provide: UsecasesProxyModule.SEARCH_BANDWIDTH_PROFILE_USECASES_PROXY,
          useFactory: (BandwidthProfileRepository: PrismaBandwidthProfileRepository) => 
          new UseCaseProxy(new Get_BandwidthProfile(BandwidthProfileRepository)),
        },

        {
          inject: [PrismaBandwidthProfileRepository],
          provide: UsecasesProxyModule.DISABLE_BANDWIDTH_PROFILE_USECASES_PROXY,
          useFactory: (BandwidthProfileRepository: PrismaBandwidthProfileRepository) => 
          new UseCaseProxy(new Disable_BandwidthProfile(BandwidthProfileRepository)),
        },

        //Benefits Acctions Crud start =======================================================
        {
          inject: [PrismaBenefitsRepository],
          provide: UsecasesProxyModule.NEW_BENEFITS_USECASES_PROXY,
          useFactory: (BenefitsRepository: PrismaBenefitsRepository) => 
          new UseCaseProxy(new Create_Benefits(BenefitsRepository)),
        },

        {
          inject: [PrismaBenefitsRepository],
          provide: UsecasesProxyModule.SEARCH_BENEFITS_USECASES_PROXY,
          useFactory: (BenefitsRepository: PrismaBenefitsRepository) => 
          new UseCaseProxy(new Get_Benefits(BenefitsRepository)),
        },
      ],
      exports: [

        //Auth Export
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,

        //BandwidthProfile Export
        UsecasesProxyModule.NEW_BANDWIDTH_PROFILE_USECASES_PROXY,
        UsecasesProxyModule.SEARCH_BANDWIDTH_PROFILE_USECASES_PROXY,
        UsecasesProxyModule.DISABLE_BANDWIDTH_PROFILE_USECASES_PROXY,

        //Benefits Export
        UsecasesProxyModule.NEW_BENEFITS_USECASES_PROXY,
        UsecasesProxyModule.SEARCH_BENEFITS_USECASES_PROXY,


      ],
    };
  }
}
