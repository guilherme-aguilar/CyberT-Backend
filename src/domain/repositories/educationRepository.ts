import { Education } from "@app/models/education";


export abstract class EducationRepository {
    abstract create (repository : Education) : Promise<void>;

    abstract update (repository : Education) : Promise<void>;

    abstract findByID (id: string) : Promise<Education | null>;
    
    // abstract count () : Promise<number>;

    abstract get () : Promise<Education[]>
  
   
}
