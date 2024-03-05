
import { Education } from "@app/models/education";
import { SelectProcess } from "@app/models/selectProcess";
import { selectProcess as RawToPrisma} from "@prisma/client";

export class PrismaSelectProcessMapper {
  
  static toPrisma(raw: SelectProcess) {
    return {
      id: raw.id,
      name: raw.name,
      sector: raw.sector,
      vacancyIssuer: raw.vacancyIssuer,
      open_at: raw.open_at,
      closed_at: raw.closed_at ?? null,
    }
  }

  static toDomain( raw: RawToPrisma ) : SelectProcess {
    return new SelectProcess({
      name: raw.name,
      sector: raw.sector,
      vacancyIssuer: raw.vacancyIssuer,
      open_at: raw.open_at,
      closed_at: raw.closed_at ?? null,
    }, raw.id)
  }
}
