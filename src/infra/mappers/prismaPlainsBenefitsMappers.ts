import { PlainsBenefits } from '@app/models/PlainsBenefits';
import { plainsBenefits as RawToPrisma } from '@prisma/client';

export class PrismaPlainsBenefitsMapper {
  static toPrisma(raw: PlainsBenefits) {
    return {
      idBenefits: raw.idBenefits,
      idPlains: raw.idPlains,
    };
  }

  static toDomain(raw: RawToPrisma): PlainsBenefits {
    return new PlainsBenefits({
      idBenefits: raw.idBenefits,
      idPlains: raw.idPlains,
    });
  }
}
