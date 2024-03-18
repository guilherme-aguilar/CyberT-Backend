import { BasicConfiguraction } from "@app/models/basicConfig";

export abstract class BasicConfigRepository {

  abstract update(request : BasicConfiguraction) : Promise<void>
  
  abstract search() : Promise<BasicConfiguraction>
  
}