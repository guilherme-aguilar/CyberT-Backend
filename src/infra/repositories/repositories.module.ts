import { Module } from '@nestjs/common';

import { PrismaModule } from '../services/prisma/prisma.module';
import { DatabaseUserRepository } from './prisma/user.repository';
import { PrismaBandwidthProfileRepository } from './prisma/prismaBandwidthProfileRepository';
import { PrismaBenefitsRepository } from './prisma/prismaBenefitsRepository';
import { PrismaCityRepository } from './prisma/prismaCityRepository';
import { PrismaPlainRepository } from './prisma/prismaPlainRepository';

@Module({
  imports: [PrismaModule],
  providers: [
    DatabaseUserRepository,
    PrismaBandwidthProfileRepository,
    PrismaBenefitsRepository,
    PrismaCityRepository,
    
    PrismaPlainRepository,
  ],
  exports: [
    DatabaseUserRepository,
    PrismaBandwidthProfileRepository,
    PrismaBenefitsRepository,
    PrismaCityRepository,

    PrismaPlainRepository,
  ],
})
export class RepositoriesModule {}
