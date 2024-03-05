import { Injectable } from '@nestjs/common';
import { PlainsBenefitsRepository } from '@app/repositories/PlainsBenefitsRepository';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { PlainsBenefits } from '@app/models/PlainsBenefits';
import { PrismaPlainsBenefitsMapper } from '@infra/mappers/prismaPlainsBenefitsMappers';

@Injectable()
export class PrismaPlainsBenefitsRepository
  implements PlainsBenefitsRepository
{
  constructor(private prismaService: PrismaService) {}


  async create(request:  PlainsBenefits): Promise<void> {

    const row = PrismaPlainsBenefitsMapper.toPrisma(request)


    await this.prismaService.plainsBenefits.createMany({
      data: row,
    });
  }

  async createMany(request: PlainsBenefits[]): Promise<void> {

    const row = request.map(PrismaPlainsBenefitsMapper.toPrisma)


    await this.prismaService.plainsBenefits.createMany({
      data: row,
    });
  }

  async deleteAllByPlain(id: string): Promise<void> {
    
    await this.prismaService.plainsBenefits.deleteMany({
      where: { idPlains : id}
    });

  }


  async get(isActive?: boolean): Promise<PlainsBenefits[]> {
    let dataPrisma = await this.prismaService.plainsBenefits.findMany();

    const data = dataPrisma.map(PrismaPlainsBenefitsMapper.toDomain);

    return data;
  }

  async getByPlain(id: string): Promise<PlainsBenefits[]> {
    const dataPrisma = await this.prismaService.plainsBenefits.findMany({
      where: { idPlains: id },
    });

    const data = dataPrisma.map(PrismaPlainsBenefitsMapper.toDomain);

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
