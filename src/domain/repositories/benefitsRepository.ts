import { Benefit } from "@app/models/benefit";
import { Plain } from "@app/models/plains";


export abstract class benefitsRepository {

  abstract create(data : Benefit) : Promise<void>;

  //abstract update(data : Benefit) : Promise<void>

  abstract getById(id : string) : Promise<Benefit>

  abstract get(isActive ?: boolean) : Promise<Benefit[]>

  abstract delete(id: string) : Promise<void>
  
}