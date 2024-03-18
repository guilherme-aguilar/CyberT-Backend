import { VacancyE } from '@app/models/vacancy';
import { ApiProperty } from '@nestjs/swagger';

export class VacancyPresenter {

  @ApiProperty()
  id: string;

  
  @ApiProperty()
  name: string;

  @ApiProperty()
  sector: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  requests: string;

  @ApiProperty()
  desirable: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  disabled_at: Date | null;


  constructor(raw: VacancyE) {
    this.id = raw.id;
    this.name = raw.name;
    this.sector = raw.sector;
    this.description = raw.description;
    this.requests = raw.requests;
    this.desirable = raw.desirable;
    this.created_at = raw.created_at;
    this.disabled_at = raw.disabled_at;
  }
}
