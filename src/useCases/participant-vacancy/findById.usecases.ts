import { ParticipantVacancyE } from '@app/models/participantVacancy';
import { ParticipantVacancyRepository } from '@app/repositories/ParticipantVacancy';

export interface Request {
 id: string
}

export interface Response {
  data: ParticipantVacancyE;
}

export class FindById_ParticipantVacancy {
  constructor(
    private readonly participantVacancyRepository: ParticipantVacancyRepository,
  ) {}

  async execute(request : Request): Promise<Response> {


    const dataReceived = await this.participantVacancyRepository.findById(request.id);

    return {
      data: dataReceived,
    };
  }
}
