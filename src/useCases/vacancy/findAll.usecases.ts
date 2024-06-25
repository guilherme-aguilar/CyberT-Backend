import { VacancyE } from '@app/models/vacancy';
import { VacancyRepository } from '@app/repositories/vacancyRepository';
import { Injectable } from '@nestjs/common';

interface response {
  data: VacancyE[];
}

@Injectable()
export class FindAll_Vacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(state?: "active" | "deactive" | "all"): Promise<response> {
    const vacancies = await this.vacancyRepository.findAll(state);

    return { data: vacancies };
  }
}
