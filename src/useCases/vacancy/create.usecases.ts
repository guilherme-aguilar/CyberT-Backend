import { VacancyE } from '@app/models/vacancy';
import { VacancyRepository } from '@app/repositories/vacancyRepository';
import { Injectable } from '@nestjs/common';

interface request {
  name: string;
  sector: string;
  description: string;
  requests: string;
  desirable: string;
}

interface response {
  data: VacancyE;
}

@Injectable()
export class Create_Vacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(data: request): Promise<response> {
    const vacancy = new VacancyE({
      name: data.name,
      sector: data.sector,
      description: data.description,
      requests: data.requests,
      desirable: data.desirable,
    });

    await this.vacancyRepository.create(vacancy);

    return { data: vacancy };
  }
}
