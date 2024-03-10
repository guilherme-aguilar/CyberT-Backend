import { Shop } from '@app/models/shop';
import { ShopRepository } from '@app/repositories/shopRepository';
import { PrismaShopMapper } from '@infra/mappers/prismaShopMappers';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PrismaShopRepository implements ShopRepository {
  constructor(private prismaService: PrismaService) {}

  async create(request: Shop): Promise<void> {
    const row = PrismaShopMapper.toPrisma(request);

    console.log(row)
    await this.prismaService.shop.create({
      data: row,
    });
  }

  async get(isActive ?: boolean ): Promise<Shop[]> {
    let dataPrisma = await this.prismaService.shop.findMany();

    if (isActive === true) {

      dataPrisma = await this.prismaService.shop.findMany({where : {
        disabled_at : null
      }}); 
    }
    
    if (isActive === false) {

      dataPrisma = await this.prismaService.shop.findMany({where : {
        disabled_at : { not: null },
      }}); 
    }

    if (!dataPrisma) {
      return null;
    }

    const data = dataPrisma.map(PrismaShopMapper.toDomain);

    return data;
  }

  async getById(id: string): Promise<Shop> {
    const dataPrisma = await this.prismaService.shop.findUnique({
      where: { id: id },
    });

    const data = PrismaShopMapper.toDomain(dataPrisma);

    return data;
  }

  async update(data: Shop): Promise<void> {
    const raw = PrismaShopMapper.toPrisma(data);

    await this.prismaService.shop.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
