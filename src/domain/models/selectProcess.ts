import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';

interface SelectProcessProps {

  name: string;
  sector: string;
  vacancyIssuer: string;
  open_at: Date;
  closed_at?: Date;
}

export class SelectProcess {
  private props: SelectProcessProps;
  private _id: string;

  constructor(
    props: Replace<SelectProcessProps, { open_at?: Date }>, 
    id?: string
    ) {
    this._id = !id ? randomUUID() : id;
    
    this.props = {
      ...props,
      open_at: props.open_at || new Date(),
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




  public set sector(sector: string) {
    this.props.sector = sector;
  }

  public get sector(): string {
    return this.props.sector;
  }



  public set vacancyIssuer(vacancyIssuer: string) {
    this.props.vacancyIssuer = vacancyIssuer;
  }

  public get vacancyIssuer(): string {
    return this.props.vacancyIssuer;
  }


  public get open_at(): Date {
    return this.props.open_at;
  }

  public get closed_at(): Date | undefined | null {
    return this.props.closed_at;
  }

  public close() {
    this.props.closed_at = new Date();
  }

}
