import { PlainsBenefits } from '@app/models/PlainsBenefits';
import { PlainsLocations } from '@app/models/PlainsLocations';
import { Plain } from '@app/models/plains';
import { ApiProperty } from '@nestjs/swagger';

export class PlainLocationPresenter {
  @ApiProperty()
  idLocations: string;

  @ApiProperty()
  idPlains: string;

  constructor(raw: PlainsLocations) {
    this.idLocations = raw.idLocations;
    this.idPlains = raw.idPlains;
  }
}

export class PlainLocationByPlainPresenter {
  @ApiProperty()
  isChecked: boolean;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  internalName: string;

  @ApiProperty()
  visibleName: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  discountPrice: string;


  constructor(raw: any) {
    this.isChecked = raw.isChecked;
    this.id = raw.id;
    this.name = raw.name;
    this.internalName = raw.internalName;
    this.visibleName = raw.visibleName;
    this.price = raw.price;
    this.discountPrice = raw.discountPrice;
  }
}
