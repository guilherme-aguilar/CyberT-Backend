import { BandwidthProfile } from '@app/models/BandwidthProfile';
import { ApiProperty } from '@nestjs/swagger';

export class BandwidthProfilePresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;
  
  @ApiProperty()
  downloadBandwidth: string;

  @ApiProperty()
  uploadBandwidth: string;

  @ApiProperty()
  disabled_at: Date;

  constructor(row: BandwidthProfile) {
    this.id = row.id;
    this.description = row.description;
    this.disabled_at = row.disabled_at;
    this.downloadBandwidth = row.downloadBandwidth;
    this.uploadBandwidth = row.uploadBandwidth;
  }
}
