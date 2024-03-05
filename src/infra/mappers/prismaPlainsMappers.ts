import { Plain } from '@app/models/plains';
import { plains as RawToPrisma } from '@prisma/client';

export class PrismaPlainMapper {
  static toPrisma(raw: Plain) {
    return {
      id: raw.id,
      visibleName: raw.visibleName,
      internalName: raw.internalName,
      price: raw.price,
      discountPrice: raw.discountPrice,
      idProfileBandwidth: raw.idProfileBandwidth,
      disabled_at: raw.disabled_at,
    };
  }

  static toDomain(raw: RawToPrisma): Plain {
    return new Plain(
      {
        visibleName: raw.visibleName,
        internalName: raw.internalName,
        price: raw.price,
        discountPrice: raw.discountPrice,
        idProfileBandwidth: raw.idProfileBandwidth,
        disabled_at: raw.disabled_at,
      },
      raw.id,
    );
  }
}
