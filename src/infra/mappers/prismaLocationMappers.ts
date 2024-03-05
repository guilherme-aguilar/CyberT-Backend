import { City } from '@app/models/city';
import { locations as RawPrisma } from '@prisma/client';

export class PrismaCityMapper {
  static toPrisma(raw: City) {
    return {
      id: raw.id,
      city: raw.city,
      state: raw.state,
      zip_code: raw.zip_code,
      disabled_at: raw.disabled_at,
      idShop: raw.idShop,
      neighborhood: raw.neighborhood,
      street: raw.street,
    };
  }

  static toDomain(raw: RawPrisma): City {
    return new City({
      city: raw.city,
      state: raw.state,
      zip_code: raw.zip_code,
      disabled_at: raw.disabled_at,
      idShop: raw.idShop,
      neighborhood: raw.neighborhood,
      street: raw.street,
    }, raw.id);
  }
}
