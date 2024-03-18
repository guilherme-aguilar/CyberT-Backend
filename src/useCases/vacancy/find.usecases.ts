import { VacancyE } from '@app/models/vacancy';
import { VacancyRepository } from '@app/repositories/vacancyRepository';
import { Injectable } from '@nestjs/common';

interface request {
  id: string;
}

interface response {
  data: VacancyE | null;
}

@Injectable()
export class Find_Vacancy {

  constructor(private vacancyRepository: VacancyRepository) {}

  async execute(data: request): Promise<response> {
    const vacancy = await this.vacancyRepository.find(data.id);

    return { data: vacancy };
  }
}
