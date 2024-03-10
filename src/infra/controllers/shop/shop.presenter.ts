import { PlainsBenefits } from '@app/models/PlainsBenefits';
import { PlainsLocations } from '@app/models/PlainsLocations';
import { Plain } from '@app/models/plains';
import { Shop } from '@app/models/shop';
import { ApiProperty } from '@nestjs/swagger';

export class ShopPresenter {

  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  
  shopName: string;


  @ApiProperty({ required: true })
  
  address: string;

  @ApiProperty({ required: true })
  
  location: string;

  @ApiProperty({ required: true })
  
  phone: string;

  @ApiProperty({ required: true })
  
  whatsapp: string;

  @ApiProperty({ required: true })
  
  main_point: boolean;

  @ApiProperty({ required: true })
  
  disabled_at: Date;


  constructor(raw: Shop) {
    this.id = raw.id;
    this.address = raw.address;
    this.location = raw.location;
    this.phone = raw.phone;
    this.whatsapp = raw.whatsapp;
    this.main_point = raw.main_point;
    this.shopName = raw.shopName;
    this.disabled_at = raw.disabled_at;
  }
}

