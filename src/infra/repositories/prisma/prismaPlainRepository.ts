import { Plain } from '@app/models/plains';
import { plainRepository } from '@app/repositories/plainRepository';
import { PrismaPlainMapper } from '@infra/mappers/prismaPlainsMappers';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PrismaPlainRepository implements plainRepository {
  constructor(private prismaService: PrismaService) {}

  async create(request: Plain): Promise<void> {
    const row = PrismaPlainMapper.toPrisma(request);

    await this.prismaService.plains.create({
      data: row,
    });
  }

  async get(isActive ?: boolean ): Promise<Plain[]> {
    let dataPrisma = await this.prismaService.plains.findMany();

    if (isActive === true) {

      dataPrisma = await this.prismaService.plains.findMany({where : {
        disabled_at : null
      }}); 
    }
    
    if (isActive === false) {

      dataPrisma = await this.prismaService.plains.findMany({where : {
        disabled_at : { not: null },
      }}); 
    }

    if (!dataPrisma) {
      return null;
    }

    const data = dataPrisma.map(PrismaPlainMapper.toDomain);

    return data;
  }

  async getById(id: string): Promise<Plain> {
    const dataPrisma = await this.prismaService.plains.findUnique({
      where: { id: id },
    });

    const data = PrismaPlainMapper.toDomain(dataPrisma);

    return data;
  }

  async update(data: Plain): Promise<void> {
    const raw = PrismaPlainMapper.toPrisma(data);

    await this.prismaService.plains.update({
      where: { id: raw.id },
      data: raw,
    });
  }
}
