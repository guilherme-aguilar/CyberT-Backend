import { randomUUID } from 'node:crypto';

interface BenefitProps {
  name: string;
}

export class Benefit {
  private _id: string;
  private props: BenefitProps;

  constructor(props: BenefitProps, id?: string) {
    this._id = !id ? randomUUID() : id;
    this.props = {
      ...props,
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
}
