import { ParticipantVacancyE } from '@app/models/participantVacancy';
import { ParticipantVacancyRepository } from '@app/repositories/ParticipantVacancy';

export interface Request {
 idVacancy: string
}

export interface Response {
  data: ParticipantVacancyE[];
}

export class FindByVacancy_ParticipantVacancy {
  constructor(
    private readonly participantVacancyRepository: ParticipantVacancyRepository,
  ) {}

  async execute(request : Request): Promise<Response> {


    const dataReceived = await this.participantVacancyRepository.findByVacancy(request.idVacancy);

    return {
      data: dataReceived,
    };
  }
}
