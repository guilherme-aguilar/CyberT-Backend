import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class addVacancyDto {

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  sector: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  requests: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  desirable: string;
}


