
import { VacancyE } from '@app/models/vacancy';
import { VacancyMapper } from '../../mappers/vacancy.mapper';
import { PrismaService } from '@infra/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { VacancyRepository } from '@app/repositories/vacancyRepository';


@Injectable()
export class PrismaVacancyRepository  implements VacancyRepository{


  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async  create(vacancy: VacancyE): Promise<void> {

    const prismaVacancy = VacancyMapper.toPrisma(vacancy);

    await this.prisma.vacancy.create({
      data: prismaVacancy,
    });

  }

  async find(id: string): Promise<VacancyE> {
    const vacancy = await this.prisma.vacancy.findUnique({
          where: { id },
        });
        return vacancy ? VacancyMapper.toDomain(vacancy) : null;
  }

  async findAll(): Promise<VacancyE[]> {
    
      const vacancies = await this.prisma.vacancy.findMany();

    return vacancies.map(VacancyMapper.toDomain);
  }

  async update(vacancy: VacancyE): Promise<void> {

    const prismaVacancy = VacancyMapper.toPrisma(vacancy);

    await this.prisma.vacancy.update({
      where: { id: prismaVacancy.id },
      data: prismaVacancy,
    });
    
  }


}