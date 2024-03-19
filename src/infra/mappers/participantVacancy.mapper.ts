import { ParticipantVacancyE } from '@app/models/participantVacancy';
import { VacancyE } from '@app/models/vacancy';
import { ParticipantVacancy as rawToPrisma } from '@prisma/client';

export class ParticipantVacancyMapper {
  static toPrisma(raw: ParticipantVacancyE) {
    return {
      id: raw.id,
      name: raw.name,
      cpf: raw.cpf,
      email: raw.email,
      idVacancy: raw.idVacancy,
      phone: raw.phone,
      rg: raw.rg,
      created_at: raw.created_at,
      disabled_at: raw.disabled_at
    };
  }

  static toDomain(raw: rawToPrisma): ParticipantVacancyE {
    return new ParticipantVacancyE({
      name: raw.name,
      cpf: raw.cpf,
      email: raw.email,
      idVacancy: raw.idVacancy,
      phone: raw.phone,
      rg: raw.rg,
      created_at: raw.created_at,
      disabled_at: raw.disabled_at
    }, raw.id);
  }
}
