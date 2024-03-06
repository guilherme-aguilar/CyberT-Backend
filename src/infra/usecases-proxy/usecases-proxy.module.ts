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
import { PrismaCityRepository } from '@infra/repositories/prisma/prismaCityRepository';
import { Create_City } from '@useCases/city/create.usecases';
import { Get_City } from '@useCases/city/search.usecases';
import { BrasilApiService } from '@infra/services/brasil-api/brasil-api.service';
import { BrasilApiModule } from '@infra/services/brasil-api/brasil-api.module';
import { Update_City } from '@useCases/city/update.usecases';
import { Disable_City } from '@useCases/city/disable.usecases';
import { PrismaPlainRepository } from '@infra/repositories/prisma/prismaPlainRepository';
import { Get_Plain } from '@useCases/plain/search.usecases';
import { Create_Plain } from '@useCases/plain/create.usecases';
import { Update_Plain } from '@useCases/plain/update.usecases';
import { Disable_Plain } from '@useCases/plain/delete.usecases';
import { PrismaPlainsBenefitsRepository } from '@infra/repositories/prisma/prismaPlainsBenefitsRepository';

import { SearchByPlain_PlainsBenefits } from '@useCases/plain-benefit/searchByPlain.usecases';

import { ClearBenefitsByPlain_PlainsBenefits } from '@useCases/plain-benefit/ClearBenefitsByPlain.usecases';
import { Update_PlainsBenefits } from '@useCases/plain-benefit/updateBenefitsByPlain.usecases';
import { Get_PlainsLocationsByLocations } from '@useCases/plain-location/searchByLocation.usecases';
import { PrismaPlainsLocationsRepository } from '@infra/repositories/prisma/prismaPlainsLocationsRepository';
import { Update_PlainsLocations } from '@useCases/plain-location/UpdatePlainsByLocation.usecases';
import { DeleteByLocations_PlainsLocations } from '@useCases/plain-location/ClearPlainsByLocation.usecases';
import { GetByLocation_Plain } from '@useCases/plain/searchByLocation.usecases';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
    BrasilApiModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  // BandWidth
  static NEW_BANDWIDTH_PROFILE_USECASES_PROXY =
    'NewBandwidthProfileUseCasesProxy';
  static SEARCH_BANDWIDTH_PROFILE_USECASES_PROXY =
    'SearchBandwidthProfileUseCasesProxy';
  static DISABLE_BANDWIDTH_PROFILE_USECASES_PROXY =
    'DisableBandwidthProfileUseCasesProxy';

  // Benefit
  static NEW_BENEFITS_USECASES_PROXY = 'NewBenefitsUseCasesProxy';
  static SEARCH_BENEFITS_USECASES_PROXY = 'SearchBenefitsUseCasesProxy';

  // City
  static NEW_CITY_PROXY = 'NewCityUseCasesProxy';
  static SEARCH_CITY_PROXY = 'SearchCityUseCasesProxy';
  static UPDATE_CITY_PROXY = 'UpdateCityUseCasesProxy';
  static DISABLE_CITY_PROXY = 'DisableCityUseCasesProxy';

  // Plain
  static NEW_PLAIN_PROXY = 'NewPlainUseCasesProxy';
  static SEARCH_PLAIN_PROXY = 'SearchPlainUseCasesProxy';
  static SEARCH_PLAIN_BY_LOCATION_PROXY = 'SearchPlainByLocationUseCasesProxy';
  static UPDATE_PLAIN_PROXY = 'UpdatePlainUseCasesProxy';
  static DISABLE_PLAIN_PROXY = 'DisablePlainUseCasesProxy';

  // PlainBenefit
  static SEARCH_PLAIN_BENEFIT_BY_PLAIN_PROXY =
    'SearchPlainBenefitByPlainUseCasesProxy';
  static UPDATE_PLAIN_BENEFIT_PROXY = 'UpdatePlainBenefitUseCasesProxy';
  static DELETE_ALL_BENEFIT_BY_PLAIN_PROXY =
    'DeleteAllBenefitByPlainUseCasesProxy';

  // PlainBenefit
  static SEARCH_PLAIN_LOCATION_BY_LOCATION_PROXY =
    'SearchPlainLocationByLocationUseCasesProxy';
  static UPDATE_PLAIN_LOCATION_PROXY = 'UpdatePlainLocationUseCasesProxy';
  static DELETE_ALL_PLAIN_BY_LOCATION_PROXY =
    'DeleteAllPlainByLocationUseCasesProxy';

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
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
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
          useFactory: (
            BandwidthProfileRepository: PrismaBandwidthProfileRepository,
          ) =>
            new UseCaseProxy(
              new Create_BandwidthProfile(BandwidthProfileRepository),
            ),
        },

        {
          inject: [PrismaBandwidthProfileRepository],
          provide: UsecasesProxyModule.SEARCH_BANDWIDTH_PROFILE_USECASES_PROXY,
          useFactory: (
            BandwidthProfileRepository: PrismaBandwidthProfileRepository,
          ) =>
            new UseCaseProxy(
              new Get_BandwidthProfile(BandwidthProfileRepository),
            ),
        },

        {
          inject: [PrismaBandwidthProfileRepository],
          provide: UsecasesProxyModule.DISABLE_BANDWIDTH_PROFILE_USECASES_PROXY,
          useFactory: (
            BandwidthProfileRepository: PrismaBandwidthProfileRepository,
          ) =>
            new UseCaseProxy(
              new Disable_BandwidthProfile(BandwidthProfileRepository),
            ),
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

        //City Acctions Crud start =======================================================
        {
          inject: [PrismaCityRepository, BrasilApiService],
          provide: UsecasesProxyModule.NEW_CITY_PROXY,
          useFactory: (
            CityRepository: PrismaCityRepository,
            brasilApiService: BrasilApiService,
          ) =>
            new UseCaseProxy(new Create_City(CityRepository, brasilApiService)),
        },

        {
          inject: [PrismaCityRepository],
          provide: UsecasesProxyModule.SEARCH_CITY_PROXY,
          useFactory: (CityRepository: PrismaCityRepository) =>
            new UseCaseProxy(new Get_City(CityRepository)),
        },

        {
          inject: [PrismaCityRepository],
          provide: UsecasesProxyModule.UPDATE_CITY_PROXY,
          useFactory: (CityRepository: PrismaCityRepository) =>
            new UseCaseProxy(new Update_City(CityRepository)),
        },

        {
          inject: [PrismaCityRepository],
          provide: UsecasesProxyModule.DISABLE_CITY_PROXY,
          useFactory: (CityRepository: PrismaCityRepository) =>
            new UseCaseProxy(new Disable_City(CityRepository)),
        },

        //Plain Acctions Crud start =======================================================
        {
          inject: [PrismaPlainRepository],
          provide: UsecasesProxyModule.NEW_PLAIN_PROXY,
          useFactory: (repository: PrismaPlainRepository) =>
            new UseCaseProxy(new Create_Plain(repository)),
        },

        {
          inject: [PrismaPlainRepository],
          provide: UsecasesProxyModule.SEARCH_PLAIN_PROXY,
          useFactory: (repository: PrismaPlainRepository) =>
            new UseCaseProxy(new Get_Plain(repository)),
        },

        {
          inject: [PrismaPlainRepository],
          provide: UsecasesProxyModule.UPDATE_PLAIN_PROXY,
          useFactory: (repository: PrismaPlainRepository) =>
            new UseCaseProxy(new Update_Plain(repository)),
        },

        {
          inject: [PrismaPlainRepository],
          provide: UsecasesProxyModule.DISABLE_PLAIN_PROXY,
          useFactory: (repository: PrismaPlainRepository) =>
            new UseCaseProxy(new Disable_Plain(repository)),
        },

        {
          inject: [
            PrismaPlainRepository,
            PrismaPlainsLocationsRepository,
            PrismaPlainsBenefitsRepository,
            PrismaBenefitsRepository,
          ],
          provide: UsecasesProxyModule.SEARCH_PLAIN_BY_LOCATION_PROXY,
          useFactory: (
            PlainRepository: PrismaPlainRepository,
            PlainLocationRepository: PrismaPlainsLocationsRepository,
            PlainBenefitsRepository: PrismaPlainsBenefitsRepository,
            BenefitsRepository: PrismaBenefitsRepository,
          ) =>
            new UseCaseProxy(
              new GetByLocation_Plain(
                PlainRepository,
                PlainLocationRepository,
                PlainBenefitsRepository,
                BenefitsRepository,
              ),
            ),
        },

        //Plain Benefits Acctions Crud start =======================================================
        {
          inject: [PrismaPlainsBenefitsRepository, PrismaBenefitsRepository],
          provide: UsecasesProxyModule.SEARCH_PLAIN_BENEFIT_BY_PLAIN_PROXY,
          useFactory: (
            repository: PrismaPlainsBenefitsRepository,
            benefitsRep: PrismaBenefitsRepository,
          ) =>
            new UseCaseProxy(
              new SearchByPlain_PlainsBenefits(repository, benefitsRep),
            ),
        },

        {
          inject: [PrismaPlainsBenefitsRepository],
          provide: UsecasesProxyModule.UPDATE_PLAIN_BENEFIT_PROXY,
          useFactory: (repository: PrismaPlainsBenefitsRepository) =>
            new UseCaseProxy(new Update_PlainsBenefits(repository)),
        },

        {
          inject: [PrismaPlainsBenefitsRepository],
          provide: UsecasesProxyModule.DELETE_ALL_BENEFIT_BY_PLAIN_PROXY,
          useFactory: (repository: PrismaPlainsBenefitsRepository) =>
            new UseCaseProxy(
              new ClearBenefitsByPlain_PlainsBenefits(repository),
            ),
        },

        //Plain Locations Acctions Crud start =======================================================
        {
          inject: [PrismaPlainsLocationsRepository, PrismaPlainRepository],
          provide: UsecasesProxyModule.SEARCH_PLAIN_LOCATION_BY_LOCATION_PROXY,
          useFactory: (
            repository: PrismaPlainsLocationsRepository,
            plainsRep: PrismaPlainRepository,
          ) =>
            new UseCaseProxy(
              new Get_PlainsLocationsByLocations(repository, plainsRep),
            ),
        },

        {
          inject: [PrismaPlainsLocationsRepository],
          provide: UsecasesProxyModule.UPDATE_PLAIN_LOCATION_PROXY,
          useFactory: (repository: PrismaPlainsLocationsRepository) =>
            new UseCaseProxy(new Update_PlainsLocations(repository)),
        },

        {
          inject: [PrismaPlainsBenefitsRepository],
          provide: UsecasesProxyModule.DELETE_ALL_PLAIN_BY_LOCATION_PROXY,
          useFactory: (repository: PrismaPlainsLocationsRepository) =>
            new UseCaseProxy(new DeleteByLocations_PlainsLocations(repository)),
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

        //City Export
        UsecasesProxyModule.NEW_CITY_PROXY,
        UsecasesProxyModule.SEARCH_CITY_PROXY,
        UsecasesProxyModule.UPDATE_CITY_PROXY,
        UsecasesProxyModule.DISABLE_CITY_PROXY,

        //Plain Export
        UsecasesProxyModule.NEW_PLAIN_PROXY,
        UsecasesProxyModule.SEARCH_PLAIN_PROXY,
        UsecasesProxyModule.UPDATE_PLAIN_PROXY,
        UsecasesProxyModule.DISABLE_PLAIN_PROXY,
        UsecasesProxyModule.SEARCH_PLAIN_BY_LOCATION_PROXY,

        //PlainBenefits Export
        UsecasesProxyModule.SEARCH_PLAIN_BENEFIT_BY_PLAIN_PROXY,
        UsecasesProxyModule.UPDATE_PLAIN_BENEFIT_PROXY,
        UsecasesProxyModule.DELETE_ALL_BENEFIT_BY_PLAIN_PROXY,

        //PlainLocations Export
        UsecasesProxyModule.SEARCH_PLAIN_LOCATION_BY_LOCATION_PROXY,
        UsecasesProxyModule.UPDATE_PLAIN_LOCATION_PROXY,
        UsecasesProxyModule.DELETE_ALL_PLAIN_BY_LOCATION_PROXY,

      ],
    };
  }
}
