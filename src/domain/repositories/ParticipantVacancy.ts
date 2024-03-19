import { ParticipantVacancyE } from "@app/models/participantVacancy";

export abstract class ParticipantVacancyRepository {

  abstract create(data: ParticipantVacancyE): Promise<void>;

  abstract findById(id : string) : Promise<ParticipantVacancyE>;

  abstract findByVacancy(idVacancy : string) : Promise<ParticipantVacancyE[]>

  abstract validateData(data: any): Promise<boolean>;

  abstract findAll(isActive?: boolean): Promise<ParticipantVacancyE[]>;

  abstract update(data : ParticipantVacancyE): Promise<void>;
}