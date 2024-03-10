import { randomUUID } from "node:crypto";


interface ShopProps {
  shopName  : string;
  address: string;
  location: string;
  phone : string;
  whatsapp: string;
  main_point: boolean;
  disabled_at ?: Date;
}

export class Shop {
  private _id : string
  private props : ShopProps
  
  constructor(props : ShopProps, id ?: string, ) {
    this._id = !id ? randomUUID() : id
    this.props = {
      ...props
    }
  }

    public get id(): string {
      return this._id;
    }

    public get shopName(): string {
      return this.props.shopName;
    }

    public set shopName(value : string) {
      this.props.shopName = value;
    }


    public get address(): string {
      return this.props.address;
    }

    public set address(value : string) {
      this.props.address = value;
    }

    public get location(): string {
    return this.props.location;
    }

    public set location(value : string) {
      this.props.location = value;
    }

    public get phone(): string {
      return this.props.phone
    }

    public set phone(value : string) {
      this.props.phone = value
    }

    public get whatsapp(): string {
      return this.props.whatsapp
    }

    public set whatsapp(value : string) {
      this.props.whatsapp = value
    }

    public get main_point(): boolean {
      return this.props.main_point
    }

    public set main_point(value : boolean) {
      this.props.main_point = value
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