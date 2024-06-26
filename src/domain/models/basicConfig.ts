import { randomUUID } from 'node:crypto';

interface CityProps {
  urlCentralCliente: string;
  urlSpeedTest: string;
  urlMinhaConexao: string;

  urlFacebook: string;
  urlInstagram: string;
  urlWhatsapp: string;

  emailAtendimento: string;
  emailComercial: string;

  telefonePrincipal: string;

  urlLocalizacao: string;
  multipleCitys: boolean;
}

export class BasicConfiguraction {
  private props: CityProps;

  constructor(props: CityProps) {
    this.props = {
      ...props,
    };
  }

  //urlCentralCliente
  public get urlCentralCliente(): string {
    return this.props.urlCentralCliente;
  }

  public set urlCentralCliente(value: string) {
    this.props.urlCentralCliente = value;
  }

  //urlMinhaConexao
  public get urlMinhaConexao(): string {
    return this.props.urlMinhaConexao;
  }

  public set urlMinhaConexao(value: string) {
    this.props.urlMinhaConexao = value;
  }

  //urlSpeedTest
  public get urlSpeedTest(): string {
    return this.props.urlSpeedTest;
  }

  public set urlSpeedTest(value: string) {
    this.props.urlSpeedTest = value;
  }

  //urlFacebook
  public get urlFacebook(): string {
    return this.props.urlFacebook;
  }

  public set urlFacebook(value: string) {
    this.props.urlFacebook = value;
  }

  //urlInstagram
  public get urlInstagram(): string {
    return this.props.urlInstagram;
  }

  public set urlInstagram(value: string) {
    this.props.urlInstagram = value;
  }

  //urlWhatsapp
  public get urlWhatsapp(): string {
    return this.props.urlWhatsapp;
  }

  public set urlWhatsapp(value: string) {
    this.props.urlWhatsapp = value;
  }

  //emailAtendimento
  public get emailAtendimento(): string {
    return this.props.emailAtendimento;
  }

  public set emailAtendimento(value: string) {
    this.props.emailAtendimento = value;
  }

  //emailComercial
  public get emailComercial(): string {
    return this.props.emailComercial;
  }

  public set emailComercial(value: string) {
    this.props.emailComercial = value;
  }

  //TelefonePrincipal
  public get telefonePrincipal(): string {
    return this.props.telefonePrincipal;
  }

  public set telefonePrincipal(value: string) {
    this.props.telefonePrincipal = value;
  }

  public get urlLocalizacao(): string {
  return this.props.urlLocalizacao;
  }
  
  public set urlLocalizacao(value: string) {
    this.props.urlLocalizacao = value;
  }

  public get multipleCitys(){
  return this.props.multipleCitys
  }
}
