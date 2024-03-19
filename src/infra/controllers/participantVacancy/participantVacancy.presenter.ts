import { ParticipantVacancyE } from '@app/models/participantVacancy';
import { ApiProperty } from '@nestjs/swagger';

export class PartipantVacancyPresenter {

  @ApiProperty()
  id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  disabled_at: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  idVacancy: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  rg: string;

  constructor(raw: ParticipantVacancyE) {
    this.id = raw.id;
    this.idVacancy = raw.idVacancy;
    this.cpf = raw.cpf
    this.name = raw.name;
    this.email = raw.email;
    this.phone = raw.phone;
    this.rg = raw.rg;
    this.created_at = raw.created_at;
    this.disabled_at = raw.disabled_at;
  }
}
