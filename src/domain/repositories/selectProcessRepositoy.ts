import { SelectProcess } from "@app/models/selectProcess";


export abstract class SelectProcessRepository {

    abstract create (repository : SelectProcess) : Promise<void>;

    abstract update (repository : SelectProcess) : Promise<void>;

    abstract findByID (id: string) : Promise<SelectProcess | null>;
    
    // abstract count () : Promise<number>;

    abstract get () : Promise<SelectProcess[]>
  
   
}
