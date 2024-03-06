import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class addPlainLocationDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  idLocations: string
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  idPlains: string;

}


