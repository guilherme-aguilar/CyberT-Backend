import { Shop } from '@app/models/shop';
import { ShopRepository } from '@app/repositories/shopRepository';
import { Injectable } from '@nestjs/common';

interface Request {
  shopName: string;
  address: string;
  location: string;
  phone: string;
  whatsapp: string;
  main_point?: boolean;
}

interface Response {
  data: Shop;
}

@Injectable()
export class Create_Shop {
  constructor(private repository: ShopRepository) {}

  async execute(request: Request): Promise<Response> {


    const { shopName, address, location, phone, whatsapp, main_point } = request;

    const mainPointValue = main_point ? main_point : false
    
    const data = await new Shop({
      shopName,
      address,
      location,
      phone,
      whatsapp,
      main_point : mainPointValue,
    });

    await this.repository.create(data);

    return {
      data: data,
    };
  }
}
