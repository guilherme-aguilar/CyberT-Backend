import { Shop } from "@app/models/shop";

export abstract class ShopRepository {

  abstract create(data : Shop) : Promise<void>

  abstract update(data : Shop) : Promise<void>

  abstract getById(id : string) : Promise<Shop>

  abstract get(isActive ?: boolean) : Promise<Shop[]>
}