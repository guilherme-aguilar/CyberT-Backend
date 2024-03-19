import { IsCpfValid } from '@infra/common/decorators/custonValidations/IsCpfValid';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class addParticipantVacancyDto {

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  @IsCpfValid()
  cpf: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  rg: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  idVacancy: string;
}


