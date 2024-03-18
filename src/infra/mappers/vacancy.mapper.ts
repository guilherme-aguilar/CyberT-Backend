import { VacancyE } from '@app/models/vacancy';
import { Vacancy as rawToPrisma } from '@prisma/client';

export class VacancyMapper {
  static toPrisma(raw: VacancyE) {
    return {
    id: raw.id,
    name: raw.name,
    sector: raw.sector,
    description: raw.description,
    requests: raw.requests,
    desirable: raw.desirable,
    created_at: raw.created_at,
    disabled_at: raw.disabled_at,
    };
  }

  static toDomain(raw: rawToPrisma): VacancyE {
    return new VacancyE({
      name: raw.name,
      sector: raw.sector,
      description: raw.description,
      requests: raw.requests,
      desirable: raw.desirable,
      created_at: raw.created_at,
      disabled_at: raw.disabled_at,
    }, raw.id);
  }
}
