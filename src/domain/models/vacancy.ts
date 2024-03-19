import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

interface VacancyM {
  name: string;
  sector: string;
  description: string;
  requests: string;
  desirable: string;
  created_at: Date;
  disabled_at?: Date;
}

export class VacancyE {
  private _id: string;
  private props: VacancyM;

  constructor(props: Replace<VacancyM, { created_at?: Date }>, id?: string) {
    this._id = !id ? randomUUID() : id;
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
  }

  public get sector(): string {
    return this.props.sector;
  }

  public set sector(value: string) {
    this.props.sector = value;
  }

  public get description(): string {
    return this.props.description;
  }

  public set description(value: string) {
    this.props.description = value;
  }

  public get requests(): string {
    return this.props.requests;
  }

  public set requests(value: string) {
    this.props.requests = value;
  }

  public get desirable(): string {
    return this.props.desirable;
  }

  public set desirable(value: string) {
    this.props.desirable = value;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

  public get disabled_at(): Date | undefined {
    return this.props.disabled_at;
  }

  public finish() {
    this.props.disabled_at = new Date();
  }
}
