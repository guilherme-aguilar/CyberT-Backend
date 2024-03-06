import { IsZipCodeValid } from '@infra/common/decorators/custonValidations/IsZipCodeValid';
import { ApiProperty } from '@nestjs/swagger';
import { fail } from 'assert';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class addPlainDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  visibleName: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  internalName: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  price: string;

  @ApiProperty({ required: false })
  @IsOptional()
  discountPrice: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  idProfileBandwidth: string;
}

export class searchPlainDto {
  @ApiProperty({ required: false })
  @IsOptional()
  isActive : string;
}

export class updatePlainDto {
  @IsOptional()
  visibleName: string;

  
  @IsOptional()
  internalName: string;


  @IsOptional()
  price: string;

  
  @IsOptional()
  discountPrice: string;

  
  @IsOptional()
  idProfileBandwidth: string;
}

