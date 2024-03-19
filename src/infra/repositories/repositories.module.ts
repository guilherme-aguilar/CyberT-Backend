import { Module } from '@nestjs/common';

import { PrismaModule } from '../services/prisma/prisma.module';
import { DatabaseUserRepository } from './prisma/user.repository';
import { PrismaBandwidthProfileRepository } from './prisma/prismaBandwidthProfileRepository';
import { PrismaBenefitsRepository } from './prisma/prismaBenefitsRepository';
import { PrismaCityRepository } from './prisma/prismaCityRepository';
import { PrismaPlainRepository } from './prisma/prismaPlainRepository';
import { PrismaPlainsBenefitsRepository } from './prisma/prismaPlainsBenefitsRepository';
import { PrismaPlainsLocationsRepository } from './prisma/prismaPlainsLocationsRepository';
import { PrismaShopRepository } from './prisma/prismaShopRepository';
import { PrismaBasicConfigRepository } from './prisma/PrismaBasicConfigRepository';
import { PrismaVacancyRepository } from './prisma/prismaVacancyRepository';
import { PrismaParticipantVacancyRepository } from './prisma/prismaParticipantVacancyRepository';

@Module({
  imports: [PrismaModule],
  providers: [
    DatabaseUserRepository,
    PrismaBandwidthProfileRepository,
    PrismaBenefitsRepository,
    PrismaCityRepository,

    PrismaPlainRepository,
    PrismaPlainsBenefitsRepository,
    PrismaPlainsLocationsRepository,
    PrismaShopRepository,
    PrismaBasicConfigRepository,
    PrismaVacancyRepository,
    PrismaParticipantVacancyRepository
  ],
  exports: [
    DatabaseUserRepository,

    PrismaBandwidthProfileRepository,
    PrismaBenefitsRepository,
    PrismaCityRepository,

    PrismaPlainRepository,

    PrismaPlainsBenefitsRepository,
    PrismaPlainsLocationsRepository,
    PrismaShopRepository,
    PrismaBasicConfigRepository,
    PrismaVacancyRepository,
    PrismaParticipantVacancyRepository
  ],
})
export class RepositoriesModule {}
