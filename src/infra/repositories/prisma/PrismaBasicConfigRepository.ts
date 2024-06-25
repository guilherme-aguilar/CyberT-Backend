import { BasicConfiguraction } from '@app/models/basicConfig';
import { BasicConfigRepository } from '@app/repositories/basicConfigRepository';
import { BasicConfigMapper } from '@infra/mappers/basicConfig.mapper';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaBasicConfigRepository implements BasicConfigRepository {
  constructor(private prismaService: PrismaService) { }

  async update(request: BasicConfiguraction): Promise<void> {
    const row = BasicConfigMapper.toPrisma(request);

    await this.prismaService.basicConfiguration.updateMany({
      data: row,
    });
  }

  async search(): Promise<BasicConfiguraction> {
    const rowToPrisma = await this.prismaService.basicConfiguration.findFirst();
    return BasicConfigMapper.toDomain(rowToPrisma);

  }
}
