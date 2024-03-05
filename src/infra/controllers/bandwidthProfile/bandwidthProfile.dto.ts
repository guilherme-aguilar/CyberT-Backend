import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class addBandwidthProfileDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  uploadBandwidth: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  downloadBandwidth: string;
}


export class searchBandwidthProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  isActive : boolean;
}

