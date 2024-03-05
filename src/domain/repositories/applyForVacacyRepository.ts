import { VacancyParticipations } from "@app/models/VacancyParticipations";

export abstract class ApplyForVacacyRepository {

  abstract send( response : VacancyParticipations) : Promise<void>;
  
}