import { Curriculum } from "@app/models/curriculum";
import { curriculum as RawCurriculum} from "@prisma/client";

export class PrismaCurricumMapper {
  
  static toPrisma(curriculum: Curriculum) {
    return {
      id: curriculum.id,
      name: curriculum.name,
      cpf: curriculum.cpf,
      rg: curriculum.rg,
      email: curriculum.email,
      phone: curriculum.phone,
      patio: curriculum.patio,
      neighborhood: curriculum.neighborhood,
      number: curriculum.number,
      zip_code: curriculum.zip_code,
      created_at: curriculum.created_at,
      read_at : curriculum.read_at ?? null,
      disabled_at : curriculum.disabled_at ?? null,
      password: curriculum.password
      
    }
  }

  static toDomain( raw: RawCurriculum ) : Curriculum {
    return new Curriculum({
      name: raw.name,
      cpf: raw.cpf,
      rg: raw.rg,
      email: raw.email,
      phone: raw.phone,
      patio: raw.patio,
      neighborhood: raw.neighborhood,
      number: raw.number,
      zip_code: raw.zip_code,
      created_at: raw.created_at,
      read_at : raw.read_at ?? null,
      disabled_at : raw.disabled_at ?? null,
      password: raw.password
    }, raw.id)
  }
}
