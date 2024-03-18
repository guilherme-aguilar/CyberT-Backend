import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class updateBasicConfiguration {
  
  @ApiProperty({ required: false })
  @IsOptional()
  urlCentralCliente: string;

  @ApiProperty({ required: false })
  @IsOptional()
  urlSpeedTest: string;


  @ApiProperty({ required: false })
  @IsOptional()
  urlMinhaConexao: string;

  @ApiProperty({ required: false })
  @IsOptional()
  urlFacebook: string;

  @ApiProperty({ required: false })
  @IsOptional()
  urlInstagram: string;

  @ApiProperty({ required: false })
  @IsOptional()
  urlWhatsapp: string;

  @ApiProperty({ required: false })
  @IsOptional()
  emailAtendimento: string;

  @ApiProperty({ required: false })
  @IsOptional()
  emailComercial: string;

  @ApiProperty({ required: false })
  @IsOptional()
  telefonePrincipal: string;

  @ApiProperty({ required: false })
  @IsOptional()
  urlLocalizacao: string;

}

