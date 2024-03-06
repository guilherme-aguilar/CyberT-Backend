import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';


import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';

import { ControllersModule } from './infra/controllers/controllers.module';
import { BcryptModule } from './infra/services/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from './infra/services/jwt/jwt.module';
import { EnvironmentConfigModule } from './infra/config/environment-config/environment-config.module';
import { LocalStrategy } from './infra/common/strategies/local.strategy';
import { JwtStrategy } from './infra/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './infra/common/strategies/jwtRefresh.strategy';
import { UsecasesProxyModule } from './infra/usecases-proxy/usecases-proxy.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/common/guards/jwtAuth.guard';
import { BrasilApiModule } from '@infra/services/brasil-api/brasil-api.module';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    EnvironmentConfigModule,
    BrasilApiModule,
  ],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}

