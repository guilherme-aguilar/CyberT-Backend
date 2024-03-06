import { IsZipCodeValid } from '@infra/common/decorators/custonValidations/IsZipCodeValid';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class addCityDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  zip_code: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsZipCodeValid()
  idShop: string;
}

export class updateCityDto {

  @ApiProperty({ required: false })
  @IsOptional()
  @IsZipCodeValid()
  idShop: string;
}

