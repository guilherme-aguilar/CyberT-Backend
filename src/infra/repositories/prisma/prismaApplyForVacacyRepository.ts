import { Injectable } from '@nestjs/common';

import { ApplyForVacacyRepository } from '@app/repositories/applyForVacacyRepository';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { PrismaApplyForVacacyMapper } from '@infra/mappers/prismaApplyForVacancyMappers';


@Injectable()
export class PrismaApplyForVacacyRepository implements ApplyForVacacyRepository {
  constructor(private prismaService: PrismaService) {}

  async send(request: any): Promise<void> {
    
    const row = PrismaApplyForVacacyMapper.toPrisma(request);

    console.log(row)

    await this.prismaService.vacancyParticipations.create({
      data: row,
    });
  }
}
