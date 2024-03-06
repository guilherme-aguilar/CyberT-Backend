import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class addBenefitDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

}

