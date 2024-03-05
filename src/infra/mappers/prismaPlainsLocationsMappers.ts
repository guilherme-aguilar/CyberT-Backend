import { PlainsLocations } from '@app/models/PlainsLocations';
import { plainsLocations as RawToPrisma } from '@prisma/client';

export class PrismaPlainsLocationsMapper {
  static toPrisma(raw: PlainsLocations) {
    return {
      idLocations: raw.idLocations,
      idPlains: raw.idPlains,
    };
  }

  static toDomain(raw: RawToPrisma): PlainsLocations {
    return new PlainsLocations({
      idLocations: raw.idLocations,
      idPlains: raw.idPlains,
    });
  }
}
