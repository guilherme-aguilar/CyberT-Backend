import { BandwidthProfile } from "@app/models/BandwidthProfile";

export abstract class BandwidthProfileRepository {

  abstract create(data : BandwidthProfile) : Promise<void>

  abstract update(data : BandwidthProfile) : Promise<void>

  abstract getById(id : string) : Promise<BandwidthProfile>

  abstract get(isActive ?: boolean) : Promise<BandwidthProfile[]>
}