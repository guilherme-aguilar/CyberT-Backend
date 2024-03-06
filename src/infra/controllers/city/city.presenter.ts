
import { City } from '@app/models/city';
import { ApiProperty } from '@nestjs/swagger';

export class CityPresenter {


  @ApiProperty()
  id: string

  @ApiProperty()
  city: string

  @ApiProperty()
  zip_code: string

  @ApiProperty()
  state: string

  @ApiProperty()
  street: string

  @ApiProperty()
  neighborhood: string

  @ApiProperty()
  idShop: string

  @ApiProperty()
  disabled_at: Date | null

  constructor(raw: City) {
    this.id = raw.id;
    this.city=raw.city;
    this.zip_code=raw.zip_code;
    this.state=raw.state;
    this.street=raw.street;
    this.neighborhood=raw.neighborhood;
    this.idShop=raw.idShop;
    this.disabled_at=raw.disabled_at ?? null;
  }

}
