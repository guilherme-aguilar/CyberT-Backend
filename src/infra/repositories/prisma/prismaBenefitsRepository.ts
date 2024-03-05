import { Injectable } from '@nestjs/common';
import { benefitsRepository } from '@app/repositories/benefitsRepository';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Benefit } from '@app/models/benefit';
import { PrismaBenefitsMapper } from '@infra/mappers/prismaBenefitsMappers';


@Injectable()
export class PrismaBenefitsRepository implements benefitsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(request: Benefit): Promise<void> {
    const row = PrismaBenefitsMapper.toPrisma(request);

    await this.prismaService.benefits.create({
      data: row,
    });
  }

  async get(isActive?: boolean): Promise<Benefit[]> {
    let dataPrisma = await this.prismaService.benefits.findMany();

    // if (isActive === true) {

    //   dataPrisma = await this.prismaService.benefits.findMany({where : {
    //     disabled_at : null
    //   }});
    // }

    // if (isActive === false) {

    //   dataPrisma = await this.prismaService.benefits.findMany({where : {
    //     disabled_at : { not: null },
    //   }});
    // }

    // if (!dataPrisma) {
    //   return null;
    // }

    const data = dataPrisma.map(PrismaBenefitsMapper.toDomain);

    return data;
  }

  async getById(id: string): Promise<Benefit> {
    const dataPrisma = await this.prismaService.benefits.findUnique({
      where: { id: id },
    });

    const data = PrismaBenefitsMapper.toDomain(dataPrisma);

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
