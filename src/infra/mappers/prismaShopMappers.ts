import { Shop } from '@app/models/shop';
import { shop as RawToPrisma } from '@prisma/client';

export class PrismaShopMapper {
  static toPrisma(raw: Shop) {
    return {
      id: raw.id,
      shopName: raw.shopName,
      address: raw.address,
      location: raw.location,
      phone: raw.phone,
      whatsapp: raw.whatsapp,
      main_point: raw.main_point,
      disabled_at: raw.disabled_at
    };
  }

  static toDomain(raw: RawToPrisma): Shop {
    return new Shop(
      {
        shopName: raw.shopName,
        address: raw.address,
        location: raw.location,
        phone: raw.phone,
        whatsapp: raw.whatsapp,
        main_point: raw.main_point,
        disabled_at: raw.disabled_at
      },
      raw.id,
    );
  }
}
