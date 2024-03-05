

import { VacancyParticipations } from "@app/models/VacancyParticipations";
import { vacancyParticipations as RawToPrisma} from "@prisma/client";


export class PrismaApplyForVacacyMapper {
  
  static toPrisma(raw: VacancyParticipations) {
    return {
      idCurriculum: raw.idCurriculum,
      idVacancy: raw.idVacancy,
    }
  }

  static toDomain( raw: RawToPrisma ) : VacancyParticipations {
    return new VacancyParticipations({
      idCurriculum: raw.idCurriculum,
      idVacancy: raw.idVacancy,
    })
  }
}

