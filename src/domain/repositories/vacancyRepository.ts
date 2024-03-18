import { VacancyE } from '@app/models/vacancy';

export abstract class VacancyRepository {

  abstract create(vacancy: VacancyE): Promise<void>;

  abstract find(id: string): Promise<VacancyE | null>;

  abstract findAll(): Promise<VacancyE[]>;

  abstract update(vacancy: VacancyE): Promise<void>;
}
