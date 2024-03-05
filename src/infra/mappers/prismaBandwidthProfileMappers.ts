import { BandwidthProfile } from '@app/models/BandwidthProfile';
import { profileBandwidth as RawToPrisma } from '@prisma/client';

export class PrismaBandwidthProfileMapper {
  static toPrisma(raw: BandwidthProfile) {
    return {
      id: raw.id,
      description: raw.description,
      downloadBandwidth: raw.downloadBandwidth,
      uploadBandwidth: raw.uploadBandwidth,
      disabled_at: raw.disabled_at
    };
  }

  static toDomain(raw: RawToPrisma): BandwidthProfile {
    return new BandwidthProfile(
      {
        description: raw.description,
        downloadBandwidth: raw.downloadBandwidth,
        uploadBandwidth: raw.uploadBandwidth,
        disabled_at: raw.disabled_at
      },
      raw.id,
    );
  }
}
