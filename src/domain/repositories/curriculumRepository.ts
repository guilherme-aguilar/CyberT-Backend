import { Curriculum } from "@app/models/curriculum";


export abstract class CurriculumRepository {
    abstract create (repository : Curriculum) : Promise<void>;

    abstract update (repository : Curriculum) : Promise<void>;

    abstract findByID (id: string) : Promise<Curriculum | null>;
    
    abstract count () : Promise<number>;

    abstract get (isActive ?: boolean  ) : Promise<Curriculum[]>
  
   
}
