import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class addPlainBeneiftDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  idBenefits: string
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  idPlains: string;
}



export class updatePlainBenefitDto {
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

