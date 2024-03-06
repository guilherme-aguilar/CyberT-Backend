import { PlainsBenefits } from '@app/models/PlainsBenefits';
import { Plain } from '@app/models/plains';
import { ApiProperty } from '@nestjs/swagger';

export class PlainBenefitPresenter {
  @ApiProperty()
  idBenefits: string;

  @ApiProperty()
  idPlains: string;

  constructor(raw: PlainsBenefits) {
    this.idBenefits = raw.idBenefits;
    this.idPlains = raw.idPlains;
  }
}

export class PlainBenefitByPlainPresenter {
  @ApiProperty()
  isChecked: boolean;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(raw: any) {
    this.isChecked = raw.isChecked;
    this.id = raw.id;
    this.name = raw.name;
  }
}
