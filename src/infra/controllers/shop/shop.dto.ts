import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class addShopDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  shopName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty({ required: false })
  @IsOptional()
  main_point: boolean;

}



export class searchShopDto {
  @ApiProperty({ required: false })
  isActive ?: string
}