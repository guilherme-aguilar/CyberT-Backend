import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';


interface ParticipantVacancyM {
  name: string;
  cpf: string;
  rg: string;
  email: string;
  phone: string;
  idVacancy: string;
  created_at: Date;
  disabled_at?: Date;
}

export class ParticipantVacancyE {
  private _id: string;
  private props: ParticipantVacancyM;

  constructor(props: Replace<ParticipantVacancyM, { created_at?: Date }>, id?: string) {
    this._id = !id ? randomUUID() : id;
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
    };
  }

 

  
  public get id(): string {
    return this._id;
  }

  
  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  set cpf(value: string) {
    this.props.cpf = value;
  }

  get rg(): string {
    return this.props.rg;
  }

  set rg(value: string) {
    this.props.rg = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(value: string) {
    this.props.phone = value;
  }

  get idVacancy(): string {
    return this.props.idVacancy;
  }

  set idVacancy(value: string) {
    this.props.idVacancy = value;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get disabled_at(): Date | undefined {
    return this.props.disabled_at;
  }

  public finish() {
    this.props.disabled_at = new Date();
  }
}
