import { randomUUID } from 'node:crypto';

interface CityProps {
  city: string;
  zip_code: string;
  state: string;
  neighborhood?: string;
  street?: string;
  idShop?: string;
  disabled_at?: Date
}

export class City {
  private _id: string;
  private props: CityProps;

  constructor(props: CityProps, id?: string) {
    this._id = !id ? randomUUID() : id;
    this.props = {
      ...props,
    };
  }

  //Id
  public get id(): string {
    return this._id;
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

  //Loja Responsavel
  public get idShop(): string {
    return this.props.idShop;
  }

  public set idShop(value: string) {
    this.props.idShop = value;
  }

  //Status de funcionamento
  public get disabled_at(): Date | null {
    return this.props.disabled_at;
  }

  public set disabled_at(value: Date | null) {
    this.props.disabled_at = value;
  }
}
