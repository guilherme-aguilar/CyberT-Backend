import { Plain } from '@app/models/plains';
import { ApiProperty } from '@nestjs/swagger';

export class PlainPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  visibleName: string;

  @ApiProperty()
  internalName: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  discountPrice: string;

  @ApiProperty()
  idProfileBandwidth: string;

  @ApiProperty()
  disabled_at: Date | null;

  constructor(raw: Plain) {
    this.id = raw.id;
    this.visibleName = raw.visibleName;
    this.internalName = raw.internalName;
    this.price = raw.price;
    this.discountPrice = raw.discountPrice;
    this.idProfileBandwidth = raw.idProfileBandwidth;
    this.disabled_at = raw.disabled_at;
  }
}

export class PlainByLocationPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  internalName: string;

  @ApiProperty()
  visibleName: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  discountPrice: string;

  @ApiProperty()
  benefits: string[];

  constructor(raw: {
    id: string;
    internalName: string;
    visibleName: string;
    price: string;
    discountPrice: string;
    benefits: string[];
  }) {
    this.id = raw.id;
    this.visibleName = raw.visibleName;
    this.internalName = raw.internalName;
    this.price = raw.price;
    this.discountPrice = raw.discountPrice;
    this.benefits = raw.benefits;
  }
}
