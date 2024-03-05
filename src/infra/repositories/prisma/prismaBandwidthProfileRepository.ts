import { Injectable } from '@nestjs/common';
import { BandwidthProfileRepository } from '@app/repositories/bandwidthProfileRepository';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { BandwidthProfile } from '@app/models/BandwidthProfile';
import { PrismaBandwidthProfileMapper } from '@infra/mappers/prismaBandwidthProfileMappers';

@Injectable()
export class PrismaBandwidthProfileRepository implements BandwidthProfileRepository {
  constructor(private prismaService: PrismaService) {}

  async create(request: BandwidthProfile): Promise<void> {
    const row = PrismaBandwidthProfileMapper.toPrisma(request);

    await this.prismaService.profileBandwidth.create({
      data: row,
    });
  }

  async get(isActive ?: boolean ): Promise<BandwidthProfile[]> {
    let dataPrisma = await this.prismaService.profileBandwidth.findMany();

    
    if (isActive === true) {
      dataPrisma = await this.prismaService.profileBandwidth.findMany({
        where: {
          disabled_at : null,
        },
      });
    }

    if (isActive === false) {
      dataPrisma = await this.prismaService.profileBandwidth.findMany({
        where: {
          disabled_at: { not: null },
        },
      });
    }

    if (!dataPrisma) {
      return null;
    }


    const data = dataPrisma.map(PrismaBandwidthProfileMapper.toDomain);

    return data;
  }

  async getById(id: string): Promise<BandwidthProfile> {
    const dataPrisma = await this.prismaService.profileBandwidth.findUnique({
      where: { id: id },
    });

    const data = PrismaBandwidthProfileMapper.toDomain(dataPrisma);

    return data;
  }

  async update(data: BandwidthProfile): Promise<void> {
    const raw = PrismaBandwidthProfileMapper.toPrisma(data);

    await this.prismaService.profileBandwidth.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
