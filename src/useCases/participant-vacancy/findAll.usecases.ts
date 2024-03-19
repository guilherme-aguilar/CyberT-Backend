import { ParticipantVacancyE } from '@app/models/participantVacancy';
import { ParticipantVacancyRepository } from '@app/repositories/ParticipantVacancy';

export interface Request {
  name: string;
  cpf: string;
  rg: string;
  email: string;
  phone: string;
  idVacancy: string;
}

export interface Response {
  data: ParticipantVacancyE[];
}

export class Findall_ParticipantVacancy {
  constructor(
    private readonly participantVacancyRepository: ParticipantVacancyRepository,
  ) {}

  async execute(): Promise<Response> {
    const dataReceived = await this.participantVacancyRepository.findAll();

    return {
      data: dataReceived,
    };
  }
}
