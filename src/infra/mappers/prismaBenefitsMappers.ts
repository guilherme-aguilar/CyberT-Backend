import { Benefit } from '@app/models/benefit';
import { benefits as RawToPrisma } from '@prisma/client';

export class PrismaBenefitsMapper {
  static toPrisma(raw: Benefit) {
    return {
      id: raw.id,
     name: raw.name
    };
  }

  static toDomain(raw: RawToPrisma): Benefit {
    return new Benefit(
      {
        name: raw.name
      },
      raw.id,
    );
  }
}
