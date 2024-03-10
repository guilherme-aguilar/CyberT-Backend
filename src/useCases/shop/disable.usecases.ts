import { Shop } from '@app/models/shop';
import { ShopRepository } from '@app/repositories/shopRepository';
import { Injectable } from '@nestjs/common';
import { ShopNotFound } from './errors/shopNotFound';

interface Request {
  id: string;
}


interface Response {
  data: Shop;
}

@Injectable()
export class Disable_Shop {
  constructor(private repository: ShopRepository) {}

  async execute({id} : Request): Promise<Response> {

    const data = await this.repository.getById(id)

    if (!data) {throw new ShopNotFound}

    data.disabled()

    await this.repository.update(data)

    return {
      data: data,
    };
  }
}
