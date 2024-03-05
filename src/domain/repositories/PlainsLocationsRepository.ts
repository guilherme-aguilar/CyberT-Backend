import { PlainsLocations } from "@app/models/PlainsLocations";



export abstract class PlainsLocationsRepository {

  abstract create(data : PlainsLocations) : Promise<void>

  abstract createMany(data : PlainsLocations[]) : Promise<void>

  abstract deleteAllByLocation(id : string) : Promise<void>

  // abstract update(data : City) : Promise<void>

  abstract getByLocation(id : string) : Promise<PlainsLocations[]>

  abstract get(isActive ?: boolean) : Promise<PlainsLocations[]>

  //abstract countByCep (zip_code : string) : Promise<number>;
}