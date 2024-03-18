import { Injectable } from '@nestjs/common';
import { VacancyRepository } from '@app/repositories/vacancyRepository';

interface request {
  id: string;
}

@Injectable()
export class Finish_Vacancy {
  constructor(private readonly vacancyRepository: VacancyRepository) {}

  async execute(data: request): Promise<void> {

    const vacancy = await this.vacancyRepository.find(data.id)

    if (!vacancy) {
      throw new Error('Vacancy not found')
    }

    vacancy.finish()

    await this.vacancyRepository.update(vacancy);
  }
}



