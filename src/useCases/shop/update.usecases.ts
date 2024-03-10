import { Shop } from '@app/models/shop';
import { ShopRepository } from '@app/repositories/shopRepository';
import { Injectable } from '@nestjs/common';
import { ShopNotFound } from './errors/shopNotFound';
import { response } from 'express';

interface Request {
  id: string;
  shopName?: string;
  address?: string;
  location?: string;
  phone?: string;
  whatsapp?: string;
  main_point?: boolean;
}

interface Response {
  data : Shop
}

@Injectable()
export class Update_Shop {
  constructor(private repository: ShopRepository) {}

  async execute(request : Request): Promise<Response> {

    const idSearch = request.id

    const DataUpdated = {
      shopName: request.shopName,
      address: request.address,
      location: request.location,
      phone: request.phone,
      whatsapp: request.whatsapp,
      main_point: request. main_point,
    }
    
    //get existing data by id search
    const OldData = await this.repository.getById(idSearch)

    // Validate if oldData not is nullable
    if (!OldData) {
      throw new ShopNotFound();
    }

    //compare data, and update 
    Object.assign(OldData, DataUpdated);

    await this.repository.update(OldData)

    return {
      data : OldData
    }

  }
}
