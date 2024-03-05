import { Education } from '@app/models/education';
import { EducationRepository } from '@app/repositories/educationRepository';
import { PrismaEducationMapper } from '@infra/mappers/prismaEducationMappers';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaEducationRepository implements EducationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(request: Education): Promise<void> {
    const row = PrismaEducationMapper.toPrisma(request);

    await this.prismaService.education.create({
      data: row,
    });
  }

  async findByID(id: string): Promise<Education> {



    console.log(id);

    const dataPrisma = await this.prismaService.education.findUnique({
      where: { id },
    });

    if (!dataPrisma) {
      return null;
    }

    const data = PrismaEducationMapper.toDomain(dataPrisma);

    return data;
  }

  async get(): Promise<Education[]> {

    let dataPrisma = await this.prismaService.education.findMany()


    if (!dataPrisma) {
      return null;
    }

     const data = dataPrisma.map(PrismaEducationMapper.toDomain);

     return data;
  
  }

   async update(repository: Education): Promise<void> {

  
    const raw = PrismaEducationMapper.toPrisma(repository)

    await this.prismaService.education.update({
      where: {id: raw.id},
      data: raw
    });
    
    
  }
}
