import { Plain } from "@app/models/plains";


export abstract class plainRepository {

  abstract create(data : Plain) : Promise<void>;

  abstract update(data : Plain) : Promise<void>

  abstract getById(id : string) : Promise<Plain>

  abstract get(isActive ?: boolean) : Promise<Plain[]>
  
}