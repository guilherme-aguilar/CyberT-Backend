import { ParticipantVacancyE } from '@app/models/participantVacancy';
import { ParticipantVacancyRepository } from '@app/repositories/ParticipantVacancy';
import { UnauthorizedException } from '@nestjs/common';

export interface Request {
  name: string;
  cpf: string;
  rg: string;
  email: string;
  phone: string;
  idVacancy: string;
}

export interface Response {
  data: ParticipantVacancyE;
}

export class Create_ParticipantVacancy {
  constructor(
    private readonly participantVacancyRepository: ParticipantVacancyRepository,
  ) {}

  async execute(
    request: Request,
  ): Promise<Response> {
    const { cpf, email, idVacancy, name, phone, rg } = request;

    const ValidateData = await this.participantVacancyRepository.validateData({
      cpf, email, phone, rg, idVacancy
    })

    if(ValidateData) throw new UnauthorizedException("Os dados inseridos já estão registrados para esta vaga.");

    const entitie = new ParticipantVacancyE({
      cpf,
      email,
      idVacancy,
      name,
      phone,
      rg,
    });

    await this.participantVacancyRepository.create(entitie);

    return {
      data: entitie,
    };
  }
}
