
import { Benefit } from '@app/models/benefit';
import { ApiProperty } from '@nestjs/swagger';

export class BenefitPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  
  @ApiProperty()
  downloadBandwidth: string;

  @ApiProperty()
  uploadBandwidth: string;

  @ApiProperty()
  disabled_at: Date;

  constructor(row: Benefit) {
    this.id = row.id;
    this.name = row.name;
  }
}
