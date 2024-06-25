import { Shop } from '@app/models/shop';
import { CityRepository } from '@app/repositories/cityRepository';
import { ShopRepository } from '@app/repositories/shopRepository';
import { Injectable } from '@nestjs/common';

interface Response {
  data: Shop
}
interface Request {
  idLocation: string;
}

@Injectable()
export class GetByLocation_Shop {
  constructor(
    private repository: ShopRepository,
    private locationRepository: CityRepository
  ) { }

  async execute(request: Request): Promise<Response> {

    const location = await this.locationRepository.getById(request.idLocation)

    const data = await this.repository.getById(location.idShop);

    return {
      data
    }
  }
}
