import { City } from "@app/models/city";

export abstract class CityRepository {

  abstract create(data : City) : Promise<void>

  abstract update(data : City) : Promise<void>

  abstract getById(id : string) : Promise<City>

  abstract get(isActive ?: boolean) : Promise<City[]>

  abstract countByCep (zip_code : string) : Promise<number>;
}