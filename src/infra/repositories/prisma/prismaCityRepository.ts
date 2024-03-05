import { Injectable } from '@nestjs/common';
import { CityRepository } from '@app/repositories/cityRepository';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { City } from '@app/models/city';
import { PrismaCityMapper } from '@infra/mappers/prismaLocationMappers';

@Injectable()
export class PrismaCityRepository implements CityRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: City): Promise<void> {
    const row = PrismaCityMapper.toPrisma(data);

    await this.prismaService.locations.create({
      data: row,
    });
  }

  async get(isActive?: boolean): Promise<City[]> {
    let dataPrisma = await this.prismaService.locations.findMany();

    if (isActive === true) {
      dataPrisma = await this.prismaService.locations.findMany({
        where: {
          disabled_at: null,
        },
      });
    }

    if (isActive === false) {
      dataPrisma = await this.prismaService.locations.findMany({
        where: {
          disabled_at: { not: null },
        },
      });
    }

    if (!dataPrisma) {
      return null;
    }

    const data = dataPrisma.map(PrismaCityMapper.toDomain);

    return data;
  }

  async getById(id: string): Promise<City> {
    const dataPrisma = await this.prismaService.locations.findUnique({
      where: { id: id },
    });

    const data = PrismaCityMapper.toDomain(dataPrisma);

    return data;
  }

  async countByCep(zip_code): Promise<number> {

    console.log(zip_code)
    const count = await this.prismaService.locations.count({
      where: { zip_code: zip_code },
    });
    console.log(count)
    return count;
  }



  async update(data: City): Promise<void> {
    const raw = PrismaCityMapper.toPrisma(data);

    await this.prismaService.locations.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
