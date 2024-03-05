import { randomUUID } from 'node:crypto';

interface CEPv2Props {
  city: string;
  zip_code: string;
  state: string;
  neighborhood?: string;
  street?: string;
  location? : any
}

export class CEPv2 {
  private props: CEPv2Props;

  constructor(props: CEPv2Props) {
    this.props = {
      ...props,
    };
  }

  //Cidade
  public get city(): string {
    return this.props.city;
  }

  public set city(value: string) {
    this.props.city = value;
  }

  //Codigo Postal
  public get zip_code(): string {
    return this.props.zip_code;
  }

  public set zip_code(value: string) {
    this.props.zip_code = value;
  }

  //Estado
  public get state(): string {
    return this.props.state;
  }

  public set state(value: string) {
    this.props.state = value;
  }

  //Bairro
  public get neighborhood(): string {
    return this.props.neighborhood;
  }

  public set neighborhood(value: string) {
    this.props.neighborhood = value;
  }

  //Rua
  public get street(): string {
    return this.props.street;
  }

  public set street(value: string) {
    this.props.street = value;
  }


}
