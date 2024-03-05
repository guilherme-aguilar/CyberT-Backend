import { Curriculum } from '@app/models/curriculum';
import { CurriculumRepository } from '@app/repositories/curriculumRepository';
import { PrismaCurricumMapper } from '@infra/mappers/prismaCurriculumMappers';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PrismaCurriculumRepository implements CurriculumRepository {
  constructor(private prismaService: PrismaService) {}

  async create(request: Curriculum): Promise<void> {
    const row = PrismaCurricumMapper.toPrisma(request);

    await this.prismaService.curriculum.create({
      data: row,
    });
  }

  async count(): Promise<number> {
    const count = await this.prismaService.curriculum.count();

    return count;
  }

  async findByID(id: string): Promise<Curriculum> {



    console.log(id);

    const dataPrisma = await this.prismaService.curriculum.findUnique({
      where: { id },
    });

    if (!dataPrisma) {
      return null;
    }

    const data = PrismaCurricumMapper.toDomain(dataPrisma);

    return data;
  }

  async get(isActive ?: boolean ): Promise<Curriculum[]> {

    let dataPrisma = await this.prismaService.curriculum.findMany()

    if (isActive === true) {

      dataPrisma = await this.prismaService.curriculum.findMany({where : {
        disabled_at : null
      }}); 
    }
    
    if (isActive === false) {

      dataPrisma = await this.prismaService.curriculum.findMany({where : {
        disabled_at : { not: null },
      }}); 
    }



    if (!dataPrisma) {
      return null;
    }

     const data = dataPrisma.map(PrismaCurricumMapper.toDomain);

     return data;
  
  }

   async update(repository: Curriculum): Promise<void> {

  
    const raw = PrismaCurricumMapper.toPrisma(repository)

    await this.prismaService.curriculum.update({
      where: {id: raw.id},
      data: raw
    });
    
    
  }
}
