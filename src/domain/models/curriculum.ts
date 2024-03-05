import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/replace';

interface CurriculumProps {
  name: string;
  cpf: string;
  rg: string;
  email: string;
  phone: string;
  patio: string;
  neighborhood: string;
  number: string;
  zip_code: string;
  created_at: Date;
  read_at ?: Date;
  disabled_at ?: Date;
  password: string;
}

export class Curriculum {
  private props: CurriculumProps;
  private _id: string;

  constructor(
    props: Replace<CurriculumProps, { created_at?: Date }>,
    id?: string,
  ) {
    this._id = !id ? randomUUID() : id;

    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
    };
  }
  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public set rg(rg: string) {
    this.props.rg = rg;
  }

  public get rg(): string {
    return this.props.rg;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public set patio(patio: string) {
    this.props.patio = patio;
  }

  public get patio(): string {
    return this.props.patio;
  }

  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  public get neighborhood(): string {
    return this.props.neighborhood;
  }

  public set number(number: string) {
    this.props.number = number;
  }

  public get number(): string {
    return this.props.number;
  }

  public set zip_code(zip_code: string) {
    this.props.zip_code = zip_code;
  }

  public get zip_code(): string {
    return this.props.zip_code;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get read_at(): Date | null | undefined{
    return this.props.read_at;
  }

  public get disabled_at(): Date | null | undefined{
    return this.props.disabled_at;
  }

  public read() {
    this.props.read_at = new Date();
  }

  public disabled() {
    this.props.disabled_at = new Date();
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }
}
