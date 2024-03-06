import { City } from '@app/models/city';
import { CityRepository } from '@app/repositories/cityRepository';
import { Injectable } from '@nestjs/common';
import { CityNotFound } from './errors/cityNotFound';

interface Response {
  data: City;
}

interface Request {
  id: string;
  idShop?: string;
}

@Injectable()
export class Disable_City {
  constructor(private repository: CityRepository) {}

  async execute(request?: Request): Promise<Response> {
    const { id } = request;

    const OldData = await this.repository.getById(id);

    // Validate if oldData not is nullable
    if (!OldData) {
      throw new CityNotFound();
    }

    OldData.disabled()

    await this.repository.update(OldData);

    return {
      data: OldData,
    };
  }
}
