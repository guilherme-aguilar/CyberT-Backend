import { BasicConfiguraction } from '@app/models/basicConfig';
import { ApiProperty } from '@nestjs/swagger';

export class BasicConfigurationPresenter {
  @ApiProperty()
  urlCentralCliente: string;

  @ApiProperty()
  urlSpeedTest: string;

  @ApiProperty()
  urlMinhaConexao: string;

  @ApiProperty()
  urlFacebook: string;

  @ApiProperty()
  urlInstagram: string;

  @ApiProperty()
  urlWhatsapp: string;

  @ApiProperty()
  emailAtendimento: string;

  @ApiProperty()
  emailComercial: string;

  @ApiProperty()
  telefonePrincipal: string;

  @ApiProperty()
  urlLocalizacao: string;

  @ApiProperty()
  multipleCitys: boolean;

  constructor(raw: BasicConfiguraction) {
    this.urlCentralCliente = raw.urlCentralCliente;
    this.urlSpeedTest = raw.urlSpeedTest;
    this.urlMinhaConexao = raw.urlMinhaConexao;
    this.urlFacebook = raw.urlFacebook;
    this.urlInstagram = raw.urlInstagram;
    this.urlWhatsapp = raw.urlWhatsapp;
    this.emailAtendimento = raw.emailAtendimento;
    this.emailComercial = raw.emailComercial;
    this.telefonePrincipal = raw.telefonePrincipal;
    this.urlLocalizacao = raw.urlLocalizacao;
    this.multipleCitys = raw.multipleCitys;
  }
}
