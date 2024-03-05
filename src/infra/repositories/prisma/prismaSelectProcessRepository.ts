import { SelectProcess } from '@app/models/selectProcess';
import { SelectProcessRepository } from '@app/repositories/selectProcessRepositoy';
import { PrismaSelectProcessMapper } from '@infra/mappers/prismaSelectProcessMappers';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class PrismaSelectProcessRepository implements SelectProcessRepository {
  constructor(private prismaService: PrismaService) {}

  async create(request: SelectProcess): Promise<void> {
    const row = PrismaSelectProcessMapper.toPrisma(request);

    await this.prismaService.selectProcess.create({
      data: row,
    });
  }

  async findByID(id: string): Promise<SelectProcess> {



    console.log(id);

    const dataPrisma = await this.prismaService.selectProcess.findUnique({
      where: { id },
    });

    if (!dataPrisma) {
      return null;
    }

    const data = PrismaSelectProcessMapper.toDomain(dataPrisma);

    return data;
  }

  async get(): Promise<SelectProcess[]> {

    let dataPrisma = await this.prismaService.selectProcess.findMany()


    if (!dataPrisma) {
      return null;
    }

     const data = dataPrisma.map(PrismaSelectProcessMapper.toDomain);

     return data;
  
  }

   async update(repository: SelectProcess): Promise<void> {

  
    const raw = PrismaSelectProcessMapper.toPrisma(repository)

    await this.prismaService.selectProcess.update({
      where: {id: raw.id},
      data: raw
    });
    
    
  }
}
