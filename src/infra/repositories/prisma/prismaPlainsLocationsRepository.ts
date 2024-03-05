import { PlainsLocations } from '@app/models/PlainsLocations';
import { PlainsLocationsRepository } from '@app/repositories/PlainsLocationsRepository';
import { PrismaPlainsLocationsMapper } from '@infra/mappers/prismaPlainsLocationsMappers';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PrismaPlainsLocationsRepository
  implements PlainsLocationsRepository
{
  constructor(private prismaService: PrismaService) {}

  async create(request: PlainsLocations): Promise<void> {
    const row = PrismaPlainsLocationsMapper.toPrisma(request);

    await this.prismaService.plainsLocations.createMany({
      data: row,
    });
  }

  async createMany(request: PlainsLocations[]): Promise<void> {
    const row = request.map(PrismaPlainsLocationsMapper.toPrisma);

    await this.prismaService.plainsLocations.createMany({
      data: row,
    });
  }

  async deleteAllByLocation(id: string): Promise<void> {
    await this.prismaService.plainsLocations.deleteMany({
      where: { idLocations: id },
    });
  }

  async get(isActive?: boolean): Promise<PlainsLocations[]> {
    let dataPrisma = await this.prismaService.plainsLocations.findMany();

    const data = dataPrisma.map(PrismaPlainsLocationsMapper.toDomain);

    return data;
  }

  async getByLocation(id: string): Promise<PlainsLocations[]> {
    const dataPrisma = await this.prismaService.plainsLocations.findMany({
      where: { idLocations: id },
    });

    const data = dataPrisma.map(PrismaPlainsLocationsMapper.toDomain);

    return data;
  }
  // async update(data: Plain): Promise<void> {
  //   const raw = PrismaPlainMapper.toPrisma(data);

  //   await this.prismaService.plains.update({
  //     where: { id: raw.id },
  //     data: raw,
  //   });
  // }
}
