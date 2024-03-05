import { randomUUID } from 'node:crypto';

interface PlainProps {
  visibleName: string;
  internalName: string;
  price: string;
  discountPrice?: string;
  idProfileBandwidth: string;
  disabled_at?: Date;
}

export class Plain {
  private _id: string;
  private props: PlainProps;

  constructor(props: PlainProps, id?: string) {
    this._id = !id ? randomUUID() : id;
    this.props = {
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get visibleName(): string {
    return this.props.visibleName;
  }

  public set visibleName(value: string) {
    this.props.visibleName = value;
  }

  public get internalName(): string {
    return this.props.internalName;
  }

  public set internalName(value: string) {
    this.props.internalName = value;
  }

  public get price(): string {
    return this.props.price;
  }

  public set price(value: string) {
    this.props.price = value;
  }

  public get discountPrice(): string {
    return this.props.discountPrice;
  }

  public set discountPrice(value: string) {
    this.props.discountPrice = value;
  }

  public get idProfileBandwidth(): string {
    return this.props.idProfileBandwidth;
  }

  public set idProfileBandwidth(value: string) {
    this.props.idProfileBandwidth = value;
  }

  public get disabled_at(): null | Date {
    return this.props.disabled_at;
  }

  public set disabled_at(value: null | Date) {
    this.props.disabled_at = value;
  }
  
  public disabled() {
    this.props.disabled_at = new Date();
  }
}
